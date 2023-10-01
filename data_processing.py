import pandas as pd
import os
import matplotlib.pyplot as plt

health_export_folder = 'health-app-exports'
files = os.listdir(health_export_folder)
# print(files)
for file in files:
    if file.startswith('HealthAutoExport'):
        health_auto_export = f'{health_export_folder}/{file}'
    elif file.startswith('Workouts'):
        workout_export = f'{health_export_folder}/{file}'



health_df = pd.read_csv(health_auto_export)
workout_df = pd.read_csv(workout_export)

for column in health_df.columns:
    print(column)
    
dates = health_df['Date']
stand_time = health_df['Apple Stand Time (min)']
active_energy = health_df['Active Energy (kJ)']
basal_energy = health_df['Basal Energy Burned (kJ)']
excercise_time = health_df['Apple Exercise Time (min)']
cyc_dist = health_df['Cycling Distance (km)']
swim_dist = health_df['Swimming Distance (m)']
step_count = health_df['Step Count (count)']
walkrun_dist = health_df['Walking + Running Distance (km)']
walk_asym_percent = health_df['Walking Asymmetry Percentage (%)']
walk_double_sup_percent = health_df['Walking Double Support Percentage (%)']
walk_step_len = health_df['Walking Step Length (cm)']

blood_O_saturation = health_df['Blood Oxygen Saturation (%)']
VO2_max = health_df['VO2 Max (ml/(kg·min))'] # Not VO2 Max (ml/(kgÂ·min))
min_HR = health_df['Heart Rate [Min] (count/min)']
max_HR = health_df['Heart Rate [Max] (count/min)']
avg_HR = health_df['Heart Rate [Avg] (count/min)']
resting_HR = health_df['Resting Heart Rate (count/min)']
resp_rate = health_df['Respiratory Rate (count/min)']
 
in_bed_S = health_df['Sleep Analysis [In Bed] (hr)']
core_S = health_df['Sleep Analysis [Core] (hr)']
deep_S = health_df['Sleep Analysis [Deep] (hr)']
rem_S = health_df['Sleep Analysis [REM] (hr)']
awake_S = health_df['Sleep Analysis [Awake] (hr)']


plt.figure(figsize=(12, 6))  # Adjust the figure size as needed
plt.plot(dates, active_energy, marker='o', linestyle='-')
plt.title('Active Energy (kJ) vs Date')
plt.xlabel('Date')
plt.ylabel('Active Energy (kJ)')
plt.grid(True)
plt.xticks(rotation=45)  # Rotate x-axis labels for better readability

plt.tight_layout()
plt.savefig('py-plots/energy')
