import pandas as pd

df_raw = pd.read_excel('./data/Film fund Moscow cinema.xlsx', index_col=0, engine="openpyxl") 
df_raw.to_json('moscow_cinema_movies.json', force_ascii=False, orient="records")
