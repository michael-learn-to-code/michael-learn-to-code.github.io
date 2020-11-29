---
layout: post
title: Create a microservice with golang
description: Learn how to make a microservice with golang
date: 2020-11-30 00:00:00
mathjax: false
---

# Create a microservice with golang

## Define service interface

```go
type Service interface {
	Status(ctx context.Context) (string, error)
	Get(ctx context.Context) (string, error)
	Validate(ctx context.Context, date string) (bool, error)
}

```


```go
type dateService struct{}

// NewService makes a new Service.
func NewService() Service {
	return dateService{}
}

```

`dateService` is an empty struct.

```go
func (dateService) Status(ctx context.Context) (string, error) {
	return "ok", nil
}
```

This syntax will attach a new `Status` method into the `dateService` struct.

## Define transport layer

```go
type validateRequest struct {
	Date string `json:"date"`
}

```
This code defines request's Type of `Validate` method. This request should have an `Date` string which constain the value to validate.
`json:"date"` is the way to declare how the field will be in JSON format. Details is here [https://golang.org/pkg/encoding/json/](https://golang.org/pkg/encoding/json/)


Next, we defines how do we decode the imcomming request

```go
func decodeValidateRequest(ctx context.Context, r *http.Request) (interface{}, error) {
	var req validateRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		return nil, err
	}
	return req, nil
}
```

First, we try to decode the request as JSON. If it's failed, then this is an invalid request. Otherwise, we cast the request to `validateRequest` struct and return it.

A simple version of decoding is

```go
func decodeGetRequest(ctx context.Context, r *http.Request) (interface{}, error) {
	var req getRequest
	return req, nil
}

```

I'm not sure about the transformation from `r` to `req`. Maybe it's done by `go-kit`

Next step, we define how to encode the response.
```go
func encodeResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	return json.NewEncoder(w).Encode(response)
}
```

Here we just encode the request as `json` and return.

## Define Endpoints

First we need to use `go-kit`, so define it in `go.mod` file
```go
...
require github.com/go-kit/kit v0.10.0
```

Then, declare a struct

```go
import "github.com/go-kit/kit/endpoint"

type Endpoints struct {
	GetEndpoint endpoint.Endpoint
	StatusEndpoint endpoint.Endpoint
	ValidateEndpoint endpoint.Endpoint
}

```

Next, we declare an ValidateEndpoint as
```go
// MakeValidateEndpoint returns the response from our service "validate"
func MakeValidateEndpoint(srv Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(validateRequest)
		b, err := srv.Validate(ctx, req.Date)
		if err != nil {
			return validateResponse{b, err.Error()}, nil
		}
		return validateResponse{b, ""}, nil
	}
}
```
So the endpoint is a callback which parses the request, calls the service and return the response.

Now, how do we map our endpoint to HTTP requests.

## Create HTTP Server

```go
import (
	"context"
	"net/http"

	httptransport "github.com/go-kit/kit/transport/http"
	"github.com/gorilla/mux"
)

// NewHTTPServer is a good little server
func NewHTTPServer(ctx context.Context, endpoints Endpoints) http.Handler {
	r := mux.NewRouter()
	r.Use(commonMiddleware) // @see https://stackoverflow.com/a/51456342

	r.Methods("GET").Path("/status").Handler(httptransport.NewServer(
		endpoints.StatusEndpoint,
		decodeStatusRequest,
		encodeResponse,
	))

	r.Methods("GET").Path("/get").Handler(httptransport.NewServer(
		endpoints.GetEndpoint,
		decodeGetRequest,
		encodeResponse,
	))

	r.Methods("POST").Path("/validate").Handler(httptransport.NewServer(
		endpoints.ValidateEndpoint,
		decodeValidateRequest,
		encodeResponse,
	))

	return r
}

func commonMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}
```

Here we learn how to import a package with an alias.

```go
	httptransport "github.com/go-kit/kit/transport/http"
```

Then,
```go
	r.Methods("POST").Path("/validate").Handler(httptransport.NewServer(
		endpoints.ValidateEndpoint,
		decodeValidateRequest,
		encodeResponse,
	))
```
Here we map POST request to `/validate` path with `ValidateEndpoint`, use `decodeValidateRequest` to decode the request, and encode the response by `encodeResponse`.

## Make a command to run

The last thing is we need a entry point to run.

```go
import (
	"context"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"stringsvc"
)

func main() {
	var (
		httpAddr = flag.String("http", ":8080", "http listen address")
	)
	flag.Parse()
	ctx := context.Background()
	// our date service
	srv := stringsvc.NewService()
	errChan := make(chan error)

	go func() {
		c := make(chan os.Signal, 1)
		signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
		errChan <- fmt.Errorf("%s", <-c)
	}()

	// mapping endpoints
	endpoints := stringsvc.Endpoints{
		GetEndpoint:      stringsvc.MakeGetEndpoint(srv),
		StatusEndpoint:   stringsvc.MakeStatusEndpoint(srv),
		ValidateEndpoint: stringsvc.MakeValidateEndpoint(srv),
	}

	// HTTP transport
	go func() {
		log.Println("Date service is listening on port:", *httpAddr)
		handler := stringsvc.NewHTTPServer(ctx, endpoints)
		errChan <- http.ListenAndServe(*httpAddr, handler)
	}()

	log.Fatalln(<-errChan)
}
```


## My Notes

- Golang's variable declaration with types doesn't need `:`, so it's a bit different from `python`.
- Function return types are grouped in `()`
- There are many valued posts at [https://blog.golang.org](https://blog.golang.org)
- The way of Golang to define 'class' and 'class methods` is a bit strange
- `(e Endpoints)` syntax is the same as `self` in python but it's readonly. It's called `Value Receiver`. You can access any property in `Endpoints` object via `e`, but cannot change its data. If you want to change data, you should use `Pointer Receiver`.
