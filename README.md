# ML-visualizations

The aim of this project is to provide a tool for visualizing common ML concepts such as its layers. Right now, it only has a sketch of a page, with no useful visualization. 

## In-process

The results are expected to show something similar to these:

### Computation in MLPs: hidden units

![alt text](https://github.com/Jerry-Master/ML-visualizations/blob/master/Ex2.png "First example")

### Computation in MLPs: full network

![alt text](https://github.com/Jerry-Master/ML-visualizations/blob/master/Ex1.png "Second example")


## Usage

To see the page you can download the package and all its content and execute index.html locally. In the future there may be a real page with all the visualizations inside. 


## Server communication
### Part 1

Since we are using Python for the backend and JavaScript for the frontend we are going to need them to communicate in some way. It is done in two main steps:

#### Running a python script via an HTTP request

First of all, a server is run which is waiting endlessly for a call to be made. More technically it is waiting for a "GET" method to be called in order to execute a function. The call is handle by a handler.

This part is run by a python script.

#### Making an HTTP request via AJAX

Now, we need a way to create that request mentioned above. There is a jQuery library called AJAX which is going to do the work.

This part is executed inside the JavaScript program.

#### Example

In the folder Example3 there is a simple page with just a button. By pressing it a http request to the address `localhost:8888` is made. At the same time, the script `http_request.py` is running in the background and printing something when the button is called. To run this example, first execute the python script in the console and then open `index.html` in a browser. 

### Part 2

The main problem with doing it as mentioned above is that the request is being made multiple times, and we still don't know the reason for it nor how to correct it. So, the second approach relies in using a python library prepared to handle everything: Flask

## Coding languages

The first sketch are visualized through P5.js, a library of JavaScript. It is no more than a square where anything can be implemented. We will also work with python to make the calculations and export some premade visualizations.

### 3D rendering

For the 3D rendering we will be using a library of P5 called P3D. A quick preview is made on [this video](https://www.youtube.com/watch?v=p4Iz0XJY-Qk).

### Matplotlib to JavaScript

There is a thing called mpld3 who claims to be an easy way to translate matplotlib code to javascript. However, we are still learning to use it.

## References

* [The coding train](https://thecodingtrain.com/)
* [P5 reference](https://p5js.org/reference/)
* [P3D](https://processing.org/tutorials/p3d/)
* [MPLD3](https://mpld3.github.io/)
* [ConvNN visualizations](https://cs.stanford.edu/people/karpathy/convnetjs/)
* [AJAX tutorial](https://www.freecodecamp.org/news/here-is-the-most-popular-ways-to-make-an-http-request-in-javascript-954ce8c95aaa/)
* [SocketServer documentation](https://docs.python.org/3/library/socketserver.html#socketserver-tcpserver-example)
* [BaseHTTPServer documentation](https://docs.python.org/2/library/basehttpserver.html#module-BaseHTTPServer)
