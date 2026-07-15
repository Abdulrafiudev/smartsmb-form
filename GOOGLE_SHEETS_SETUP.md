# Google Sheets setup

1. Create or open the Google Sheet that should receive the form answers.
2. In that Sheet, open **Extensions → Apps Script**.
3. Replace the contents of `Code.gs` with everything in `google-apps-script.gs`, then save.
4. Click **Deploy → New deployment**.
5. Choose **Web app** and configure:
   - **Execute as:** Me
   - **Who has access:** Anyone (including visitors who are not signed in)
6. Click **Deploy**, authorize the script, and copy the Web app URL. It must end in `/exec` (do not use the `/dev` test URL).
7. In `index.html`, replace `PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with that `/exec` URL.
8. Publish the updated `index.html` and send one test response. A `Responses` tab and its column headers will be created automatically.

If your Google Workspace account does not offer anonymous/“Anyone” access, its administrator has restricted public web apps. Use an account that permits public web-app deployments or ask the administrator to allow it; otherwise website visitors will be sent to a Google sign-in page and their answers will not be saved.

If you later edit `google-apps-script.gs`, deploy a new web-app version from **Deploy → Manage deployments → Edit → New version**. The `/exec` URL can stay the same.
