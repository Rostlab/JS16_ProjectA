A web crawler or web spider is a program, which visits websites and grabs data from and stores it
to a database to enable analytics and data mining.

How to use the Twitter Crawler:

1. Make sure you have Python installed
  -If you have OS X, install Homebrew first. Homebrew is THE package manager for Mac.
  -Install pip. pip is a Python package manager.
  -Run "pip install tweepy" to install the Tweepy library.
2. Open console and switch to folder "app/misc/twitter_crawler"
3. Create here an empty .txt or .json file
4. Open the file "twitter_crawler.py". Go to line 7 - 10 and enter the Twitter API access codes.
  -You can get them by registering at http://apps.twitter.com
5. Specify on line 33 your search keywords.
  -E.g. "stream.filter(track=['Keyword 1', 'Keyword 2', 'Keyword 3'])"
4. Run this command "python twitter_crawler.py > your_target_file_here.txt"
5. Let the crawler run as long as you want. 
  -Remember, that after a few days the target file will be several hundred MByte in size.
  -The target file should look like the "app/misc/twitter_crawler/mock_tweet.json"
6. If you want, import the resulting file to the MongoDB database.
  -The respective Mongoose model is in "app/models/tweets.js"
7. Happy Text Mining!