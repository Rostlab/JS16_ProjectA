#Tweepy is a Python library for crawling Twitter
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream

#Variables that contains the user credentials to access Twitter API 
access_token = "access_token_here"
access_token_secret = "access_token_secret_here"
consumer_key = "consumer_key_here"
consumer_secret = "consumer_key_secret_here"


#This is a basic listener that prints received tweets to stdout.
class StdOutListener(StreamListener):

    def on_data(self, data):
        print data
        return True

    def on_error(self, status):
        print status


if __name__ == '__main__':

    #This handles Twitter authentification and the connection to Twitter Streaming API
    l = StdOutListener()
    auth = OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    stream = Stream(auth, l)

    #This line filter Twitter Streams to capture data by the keywords: 'Game of Thrones'
    stream.filter(track=['Game of Thrones'])