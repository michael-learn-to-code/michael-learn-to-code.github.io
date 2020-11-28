type TMeta = {
  name: string;
  value: string;
};
type TPostMeta = {
  description?: string;
  keywords?: string;
  title: string;
  thumb: string;
}
type TPost = {
  title: string;
  description: string;
  printDate?: Date;
  imageId: string;
  imageAuthor?: string;
  slug: string; 
  tagList: Array<string>;
  excerpt: string;
  mathjax?: boolean;
  metadata?: TPostMeta;
  printReadingTime: string;
  tocHtml?: string;
  html: string;
}