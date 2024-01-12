console.log("working")

const doApiCall = async (event) => {
    const baseurl = "/api/anything"

    try{

        const response = await fetch(baseurl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });
        if(response.status === 400){
          // bootstrap modal is better instead of alert
            alert("you made a boo-boo");
            return; // end the function
        }
        console.log(response);
        const data = await response.json();
        console.log(data);
    
        // redirect to a profile or another page that lists the info
        // bootstrap modal is better than alert
        alert("You did good! \n" + JSON.stringify(data));
      } catch (err) {
        // workaround until we have input validation
        console.log(err);
      }
}