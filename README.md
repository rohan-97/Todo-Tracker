# NewTab-Chrome-Extention
A google chrome extension for customized new tab which displays a to-do list

Increase your productivity by adding to-do list right at your Newtab screen of your browser

Following is the working demo of the New Tab extension
![working-demo](https://github.com/rohan-97/NewTab-Chrome-Extention/blob/master/to_do_list.gif)

## Install directory from chrome web store

You can [click here](https://chrome.google.com/webstore/detail/todo-tracker/janilffnfjijnlakfjpaopbpadomhboh) to navigate to chrome web store where you can install this extension

## Steps for building extension and setting up locally

install npm on the system and navigate to the root dir0ectory of this project and execute following commands

1. Clone this repository or download the zip file  

1. Initialize the node modules using following command
```
npm install
```

2. Build the bundled files
```
npm run build
```

The first command should download all the dependencies under the node_modules directory

The second command should bundle all the scripts under dist directory on the top of project  

Naviagate to chrome and use following URL to access the [extension page](chrome://extensions)  

and hit load unpacked button and select the dist directory created inside this repository, your new tab should show the to-do list


## Some features added in Todo Queue
 - Associate tasks with priority
 - Associate tasks with deadline
 - Generate notes of task completed/incomplete on daily basis for tracking purpose
 - Allow dragging tasks up/down so that we can order tasks
 - Make background customizable

Pull requests are always welcome :)
