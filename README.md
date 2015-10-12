# Command-Line Interface for NumbersAPI

# How to use:

node cli.js --trivia 100 --math 9981 --date 2005 --save

# Sample Output

    {
        "year": "2005 is the year that Twelve holidaymakers are killed in southern Switzerland when a bus carrying 27 people plunges 656 feet (200 m) into a ravine on April 17th.",
        "trivia": "152 is the number of diapers solder in a Pampers Swaddlers pack.",
        "math": "9981 is an uninteresting number.",
        "saved": "2015-10-12T03:18:06.994Z"
    }


# Command-Line Options

--math : Gives you a certain fact about the number

--trivia : Gives you a certain trivia about the number

--date (MM/DD) : Gives you a certain fact about that month and day

--date (YYYY) : Gives you a certain fact about that year

--save : Saves the data to 'facts.json'

