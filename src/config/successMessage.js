const successMessages = (url, setLoading) => {
    setLoading(true);
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const messages = json.messages;
          setTimeout(() => {
            if (json.status === "success") {
              messages.map((message, index) => {
                const div = document.createElement("div");
                div.innerHTML = index + 1 + ". " + message;
                div.setAttribute("class", "alert success_message");
                document.querySelector("body").appendChild(div);
              });
            } else {
              messages.map((message, index) => {
                const div = document.createElement("div");
                div.innerHTML = index + 1 + ". " + message;
                div.setAttribute("class", "alert danger_message");
                document.querySelector("body").appendChild(div);
              });
            }
  
            console.log('this is resp', json);
            setLoading(false);
          }, 3000)
  
        setTimeout(cleanDom, 2000);
        function cleanDom() {
          document.querySelectorAll(".alert").forEach((alert) => {
            alert.remove();
          });
        }
      });
  };
  export default successMessages;