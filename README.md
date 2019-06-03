# Golden Hour Wedding Website

## Installing Project

cd into your project folder and run the following commands 

```shell
bower install
npm install
```

## Watching files and running a dev server

```shell
gulp serve
```

This will run a server for the project that can be accessed at [http://localhost:9000](http://localhost:9000). Changes to files will tell Gulp to automatically rebuild the site. Gulp will also run and compile SASS to CSS , and compile JS when it detects changes to any of these types of files.

## Building the site

```shell
gulp
```

This command will compile all assets, compress images, and compile/minify JS and then build the site to the /dist directory. This directory can then be pushed to your remote site.