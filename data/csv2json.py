from csv import DictReader
import json

excel_coding_format = 'ISO-8859-1'
csv_file = "pubList.csv"
out_file = "pubList.json"
prefix_for_js = "ctri.data = "
data = []

with open(csv_file, 'r', encoding=excel_coding_format) as fh:
    csv = DictReader(fh)
    for row in csv:
        author = [row['first_name'],row['middle_name'],row['last_name']]
        if row['title'] == "":
            data[len(data)-1]['author'].append(author)
            continue
        data.append({
            'title': row['title'],
            'journal': row['journal'],
            'topic': row['topic'],
            'date': row['date_of_publication'],
            'pages': row['pages'],
            'volume': row['volume'],
            'issue': row['issue'],
            'link': row['url'],
            'author': [author]
        })

with open(out_file, 'w') as fh:
    fh.write(prefix_for_js + json.dumps(data))
