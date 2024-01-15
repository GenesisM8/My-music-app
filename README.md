# Music Taste

Hey all welcome to this practice takehome challenge

**To get started with this challenge, you need to fork this repository.**

In the `streamingData` folder, you will find 9 JSON files. These files contain a year's worth of streaming history from Spotify, with roughly 80,000 song entries.

The json will look like the following:
```json
[
 {
    "endTime" : "2022-08-20 00:02",
    "artistName" : "Maroon 5",
    "trackName" : "How",
    "msPlayed" : 216600
  },
  {
    "endTime" : "2022-08-20 00:04",
    "artistName" : "A Great Big World",
    "trackName" : "I Don't Wanna Love Somebody Else",
    "msPlayed" : 163960
  },
  {
    "endTime" : "2022-08-20 00:08",
    "artistName" : "Anna Clendening",
    "trackName" : "Boys Like You - Acoustic",
    "msPlayed" : 238576
  }
]
```
Your task is to collect all this data and present it in a more human-readable format.

You will need to produce two outputs: one for songs by count, and the other for artists by count. Additionally, for each song in the output, you should list the count and total time spent listening to that song, broken down into a `dd days hh hours mm minutes ss seconds` format. They should be sorted by count plays

I have been vauge with exactly how the output should look like since you will be able to use whatever tech or languge you want, that being said, you shouldn't use one that completes this challenge for you (not sure if it exist, but just in case)

you can return it as an xlsx file, or as a frontend with react, the choice is yours.

to give you a better idea of what the output should look like, here is an example of what a solution could look like. (this would be for songs by count, there should also be one for artist by count)

| Song Title                       | Count | Time                                       |
|----------------------------------|-------|--------------------------------------------|
| For All you give                 | 635   | 1 days, 9 hours, 22 minutes, 56.19 seconds |
| Crazier Things (with Noah Kahan) | 356   | 1 days, 1 hours, 41 minutes, 46.26 seconds |
| Wish on an Eyelash, Pt. 2        | 329   | 16 hours, 43 minutes, 30.6 seconds         |
