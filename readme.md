Notiwire
========
Notiwire works as a proxy/middlelayer for Notifiers and as an endpoint for
NotiPis. The project tries to solve three central problems:

1. *proxy*: take the load off various websites which today has to serve a lot
of content to an increasingly big number of Notifiers (clients).

2. *parser*: websites which distributes data in unfriendly formats (html, text etc.)
has to be parsed and presented in json. Today this is done on each Notifier, which
naturally can be considered to be unnecessary and heavy.

3. *listener*: each NotiPi reports back to Notiwire over http. It is Notiwire's job
job to handle incoming data.

### API
Notiwire offers an API. Documentation will follow.

### Wireframe
![alt text](wireframe.jpg)

### References
