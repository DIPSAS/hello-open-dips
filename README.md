# Hello Open DIPS React App

Thanks for checking out our Hello World SMART on FHIR app that connects to our
DIPS sandbox, [Open DIPS](https://open.dips.no)! In short this application
showcases how you can build a SMART on FHIR app that works with DIPS Arena.
It's a patient-spoecific app which fetches some basic information about the
patient, e.g. their date of birth and a list of documents in the EHR. 

# Try the app

If you'd only like to see how the app looks, go to
[hello.open.dips.no](https://hello.open.dips.no). When asked for credentials you
can use `OPENDIPS` as both username and password. You can see more information 
about valid data to test with on [open.dips.no/data](https://open.dips.no/data) 

# Run the app yourself

To run this app yourself, 

1. Clone down the repository 

``` 
$ git clone https://github ... 
```

2. Go to open.dips.no/profile and grab the a subscription key to our APIs. The
	 app needs the subscription key to be able to call our APIs. 
3. Replace the subscription key in the `.env` file. 
4. Build and run the app with `npm`. PS: You'll need to download and install [Node.js](https://nodejs.org/en/) first! 

```
$ npm install
$ npm start 
``` 

# Questions? 

If you have any questions or issues [please submit a new Issue!](https://github.com/DIPSAS/hello-open-dips/issues/new/choose)
If you want to contribute to the app, or have any changes, feel free to submit a pull request. 
