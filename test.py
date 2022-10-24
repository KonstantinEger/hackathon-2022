
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from pyvirtualdisplay import Display
import pyperclip
import time

display = Display(visible=0, size=(800, 600))
display.start()

# now Firefox will run in a virtual display.
# you will not see the browser.
browser = webdriver.Firefox(executable_path=r'/home/denis/hackathon-2022/geckodriver')
browser.get('https://web.whatsapp.com/') # works with self-signed certs
browser.save_screenshot('screenie.png')
browser.set_window_size(1024, 768)
time.sleep(10.5)
browser.save_screenshot('screenie.png')
a = input("Press enter after you login.")

browser.save_screenshot('screenie.png')

with open('groups.txt', 'r', encoding='utf8') as f:
    groups = [group.strip() for group in f.readlines()]

with open('msg.txt', 'r', encoding='utf8') as f:
    msg = f.read()

for group in groups:
    search_xpath = '//div[@contenteditable="true"][@data-tab="3"]'
    browser.save_screenshot('screenie.png')
    search_box = WebDriverWait(browser, 500).until(
        EC.presence_of_element_located((By.XPATH, search_xpath))
    )

    search_box.clear()

    time.sleep(1)

    pyperclip.copy(group)

    search_box.send_keys(Keys.SHIFT, Keys.INSERT)  # Keys.CONTROL + "v"

    time.sleep(2)
    browser.save_screenshot('screenie.png')
    group_xpath = f'//span[@title="{group}"]'
    group_title = browser.find_element("xpath", group_xpath)

    group_title.click()


    time.sleep(1)
    browser.save_screenshot('screenie.png')
    input_xpath = '//div[@data-testid="conversation-compose-box-input"]'
    input_box = browser.find_element("xpath", input_xpath)
    input_box.click()
    time.sleep(3)
    browser.save_screenshot('screenie.png')
    input_box.send_keys(msg)
    browser.save_screenshot('screenie.png')

    time.sleep(2)

    display.stop()