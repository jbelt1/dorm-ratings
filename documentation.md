
# PROJECT NAME

---

Name: Jeffrey Belt III

Date: December 1, 2018

Project Topic: Residence Hall Reviews

URL: 

---


### 1. Data Format and Storage

#### Review

Data fields:
- `Field 1`: For       `Type: String`
- `Field 2`: User      `Type: String`
- `Field 3`: Location      `Type: Number`
- `Field 4`: Cleanliness     `Type: Number`
- `Field 5`: Amenities   `Type: Number`
- `Field 6`: Social   `Type: Number`
- `Field 7`: Comment `Type: String`
- `Field 8`: Adjectives `Type: [String]`

Schema: 
```javascript
{
   name: {
        type: String,
        required: true
    },
   user: {
      type: String, 
      required: true
   }
   location: {
      type: Number,
      min: 0.0,
      max: 5.0,
      required: true
   },
   cleanliness: {
      type: Number,
      min: 0.0,
      max: 5.0,
      required: true
   }, 
   amenities: {
      type: Number,
      min: 0.0,
      max: 5.0,
      required: true
   }, 
   social: {
      type: Number, 
      min: 0.0,
      max: 5.0,
      required: true
   },
   comment: String,
   adjectives: [String]
}
```

### 2. Add New Data

HTML form route: `/addReview/:dormName`

POST endpoint route: `/api/addReview`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/addReview',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       name: "Hagerstown",
       user: "jbelt1",
       location: 4.0,
       cleanliness: 3.0,
       amenities: 1.0,
       social: 2.3,
       comment: "Super hot",
       adjectives: ["Uncomfortable", "Social"]
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getAllReviews`

### 4. Search Data

Search Field: `name`

### 5. Navigation Pages

Navigation Filters
1. Random -> `/random`
2. Cleanest Dorms -> `/clean`
3. Most Social Dorms -> `/social`
4. Best Location -> `/convenient`
5. Highest Quality Dorms -> `/quality`

