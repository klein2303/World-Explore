import csv
import pandas as pd

df = pd.read_csv('./backend/data/countries_with_images.csv')

column_renames = {
    'Country': 'name',
    'Continent': 'continent',
    'Capital/Major City': 'capital',
    'Largest city': 'largestcity',
    'Currency-Code': 'currency',
    'Official language': 'language',
    'Population': 'population',
    'Land Area(Km2)': 'landarea',
    'Agricultural Land( %)': 'agriculturearea',
    'Forested Area (%)': 'forestarea',
    'Co2-Emissions': 'co2emissions',
    'Image URL': 'image'
}

# Rename the columns
df.rename(columns=column_renames, inplace=True)

# Save the updated dataset back to a CSV file
df.to_csv('./backend/data/renamed_countries_data.csv', index=False)

# Open your data file
with open('./backend/data/renamed_countries_data.csv', 'r') as file:
    reader = csv.DictReader(file)
    
    # Specify the fields you want to keep
    fields_to_keep = ['name', 'continent', 'capital', 'largestcity', 'currency', 'language', 
                      'population', 'landarea', 'agriculturearea', 'forestarea', 'co2emissions', 'image']
    
    # Open a new file to save the filtered data
    with open('./backend/data/filtered_countries_data.csv', 'w', newline='') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=fields_to_keep)
        writer.writeheader()
        
        # Write only the necessary fields
        for row in reader:
            filtered_row = {field: row[field] for field in fields_to_keep}
            writer.writerow(filtered_row)

print("Filtered data saved to 'filtered_countries_data.csv'")
