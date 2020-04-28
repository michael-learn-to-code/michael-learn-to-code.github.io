---
layout: post
title: Some tips to work with Jupyter Notebook
image: /img/posts/some-tips-to-work-with-jupyter-notebook.png
date: 2018-08-29 00:00:00 +0300
tags: jupyter, fastai
description: These tips for easier co-working with Jupyter notebook
keywords: jupyter, notebook, tips
comment: true
imageId: 3ym6i13Y9LU
imageAuthor: Mike Tinnion
toc: true
categories:
  - Jupiter
  - development
---

# Some tips to work with Jupyter Notebook

## Folder structure

![folder structure](/some-tips-jupyter-notebook/folder_structure.png)

Here we have 4 main folders:

1. `develop` folder contains all in-developing notebooks.
2. `delivery` folder contains all ready-to-use, production notebooks.
3. `data` folder contains data that all notebooks use
4. `figures` folder contains all output, saved figures from all notebooks
5. `src` folder for custom source code

In case you need to import some external libraries, you can use symlinks.
In this example, I use symlink to link to `fastai` library, and external `data` folder too.
In your notebook, you need to add root folder into system paths before importing

![begin of notebook](/some-tips-jupyter-notebook/begin_notebook.png)

### Advantages:

1. When you finish development, you can just move your notebooks from `develop` to `delivery` folder without breaking their codes which access to `data` or display figures.

## Naming convention

A notebook's name should be start with the format: `yyyy-mm-dd-<project_code>-<notebook_name>`. And all output figures should have same prefix.

### Advanges:

1. You can easily search/filters files, notebooks

## post-save hook

You should set-up jupyter's post-save hook, which should export your notebook to `html` and `py` format.

In ~/.jupyter/jupyter-notebook-config.py, insert below code

```python
import io
import os
from notebook.utils import to_api_path

_script_exporter = None

from subprocess import check_call
def script_post_save(model, os_path, contents_manager, **kwargs):
    """convert notebooks to Python script after save with nbconvert

    replaces `ipython notebook --script`
    """
    from nbconvert.exporters.script import ScriptExporter

    if model['type'] != 'notebook':
        return

    global _script_exporter

    if _script_exporter is None:
        _script_exporter = ScriptExporter(parent=contents_manager)

    log = contents_manager.log

    base, ext = os.path.splitext(os_path)
    py_fname = base + '.py'
    d, fname = os.path.split(os_path)
    check_call(['jupyter', 'nbconvert', '--to', 'html', fname], cwd=d)

    script, resources = _script_exporter.from_filename(os_path)
    script_fname = base + resources.get('output_extension', '.txt')
    log.info("Saving script /%s", to_api_path(script_fname, contents_manager.root_dir))

    with io.open(script_fname, 'w', encoding='utf-8') as f:
        f.write(script)

c.FileContentsManager.post_save_hook = script_post_save
```

From now, everytime you save the notebook (or autosave), it will create a `py` file with all your code, and a `html` file with all outputs from the notebook.

`py` file will helpful in sharing, reviewing and tracking changes of your notebooks.
`html` file will helpfull in sharing the notebook's output wihout re-run the notebook again (in many cases, it can take few hours to run all cells of a notebook)

### Advantages:

1. Safer as your notebook always be backed up.
2. Easy for sharing and tracking changes
