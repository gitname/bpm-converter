# BPM Converter

### Backstory

My friend, who operates a recording studio, posted a message on Facebook saying he wanted to convert a tempo into a beat duration.

Inspired by his message, I built this web app, which people can use to convert a tempo into a beat duration and vice versa.

### Features

This web app offers the following features:

* **Convert a Tempo into a Beat Duration** - Convert a tempo (in beats per minute, or *BPM*) into an equivalent beat duration (in milliseconds, or *ms*)
* **Convert a Beat Duration into a Tempo** - Convert a beat duration (in milliseconds, or *ms*) into an equivalent tempo (in beats per minute, or *BPM*)
* **Click to Copy** - Click a button to copy a value to the clipboard

### Technologies

I used the following technologies while developing this web app:

* React (via [`create-react-app`](https://www.npmjs.com/package/create-react-app))
* Semantic UI
* [`react-copy-to-clipboard`](https://www.npmjs.com/package/react-copy-to-clipboard)
* Jest

### Roadmap

I'm considering adding the following features to this web app:

1. **Specify a Time Signature**: standard music notation includes the concept of a time signature (e.g. 4/4), of which the bottom number indicates the type of note that has a duration of 1 beat. For example, the time signatures of 2/4, 3/4, and 4/4 each indicate that a quarter note has a duration of 1 beat. By allowing the user to specify a time signature, the web app can flexibly accomplish item 2 below.
2. **Display Note Durations (in *ms*)**: music producers oftentimes want to know how long (in *ms*) a given note would last at a given tempo (e.g. at a tempo of 60 *BPM*, given a time signature of 4/4, a quarter note would have a duration of 1000*ms* and an eighth note would have a duration of 500*ms*).