
import URLS from './url'

class Http {
    static instance = new Http()

    //retrieves all badges from the badges api and stores stores them in a response then returns it.
    get_all = async () => {
        try {
            let request = await fetch(`${URLS.badges_url}/all/`)
            let response = await request.json()
            return response
        } catch (err) { //in case it can't retrieve badges and HTTP error will be displayed
            console.log('HTTP get all method error', err)
            throw Error(err)
        }
    }

    //gets a Badge from the badge api if it can't throws an error
    get = async badgeId => {
        try {
            let request = await fetch(`${URLS.badges_url}/_id:${badgeId}/`)
            let response = await request.json()
            return response
        } catch (err) {
            console.log('HTTP get method error', err)
            throw Error(err)
        }
    }

    //creates a badge
    post = async badge => {
        try {
            let request = await fetch(`${URLS.badges_url}/new/`,{
                method:'POST',
                body:JSON.stringify(badge), //saves data into a variable using a post method
            })
            let response = await request.json() //transofrms data into a json
            return response
        } catch (err) {
            console.log('HTTP post method error', err)
            throw Error(err)
        }
    }

    //edits a badge
    put = async (badgeId, body) => {
        try {
            let request = await fetch(`${URLS.badges_url}/_id:${badgeId}/`,{
                method:'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json'
                },
                body:JSON.stringify(body),
            })
            let response = await request.json()
            return response
        } catch (err) {
            console.log('HTTP put method error', err)
            throw Error(err)
        }
    }
    
    //deletes a badge
    remove = async badgeId => {
        try {
            let request = await fetch(`${URLS.badges_url}/_id:${badgeId}/`,{
                method:'DELETE',
            })
            let response = await request.json()
            return response
        } catch (err) {
            console.log('HTTP delete method error', err)
            throw Error(err)
        }
    }
}

export default Http