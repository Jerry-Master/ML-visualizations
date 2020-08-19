import socketserver
from http.server import BaseHTTPRequestHandler
import time

def some_function():
    print("some_function got called")

class MyHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        if self.path == '/something':
            # Insert your code here
            some_function()

        self.send_response(200)

httpd = socketserver.TCPServer(("localhost", 8888), MyHandler)
httpd.serve_forever()