define(function () {
  class FetchData {
    static getData(url) {
      return fetch(url, {
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'GET',
        //mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
      })
        .then(response => response.json())
    }
    static getDataOri(url) {
      return fetch(url, {
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'GET',
        //mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
      })
    }
    static postData(url, data) {
      return fetch(url, {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
      })
        .then(response => response.json())
    }
    static postDataOri(url, data) {
      return fetch(url, {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
      })
    }
    static multiPostDataSameURL(url, dataSet) {
      return Promise.all(dataSet.map(data =>
        this.postData(url, data)
      ));
    }
  }
  return FetchData;
})
