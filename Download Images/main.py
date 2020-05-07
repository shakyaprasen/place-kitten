import requests
import time

time_interval=5       ##in seconds
width_parameter=200
height_parameter=200
title_index=1

def save_image(url, filename):
    r = requests.get(url)
    with open(filename,'wb') as f:  
        f.write(r.content) 
    
    
while(True):
    url_for_cat_image="http://placekitten.com/"+str(width_parameter)+"/"+str(height_parameter)
    image_file_name="../Cat_Images/Cat_"+str(title_index)+".jpg"
    save_image(url_for_cat_image,image_file_name )
    
    if((width_parameter)< 100 and (width_parameter)> 500):
        width_parameter=100
        
    else:
        width_parameter=width_parameter+50
        
    if((height_parameter)< 100 and (height_parameter)> 500):
        height_parameter=100
        
    else:
        height_parameter=height_parameter+50
        
    title_index=title_index+1
    time.sleep(time_interval)
                