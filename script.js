document.getElementById("contactForm").addEventListener("submit", async (e)=>{
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Loader
  const loader = document.createElement("div");
  loader.innerHTML = "⏳ Sending...";
  loader.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.8);color:white;padding:20px 30px;border-radius:10px;font-size:18px;z-index:9999";
  document.body.appendChild(loader);

  try {
    const response = await fetch("http://localhost:5000/submit", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ name,email,message })
    });

    document.body.removeChild(loader);

    if(response.ok){
      const popup = document.createElement("div");
      popup.innerHTML = "✅ Message Sent Successfully!";
      popup.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#4CAF50;color:white;padding:20px 40px;border-radius:10px;font-size:20px;box-shadow:0 4px 10px rgba(0,0,0,0.3);z-index:9999";
      document.body.appendChild(popup);

      setTimeout(()=>{
        document.body.removeChild(popup);
        document.getElementById("contactForm").reset();
      }, 2000);
    } else {
      alert("❌ Something went wrong! Check backend.");
    }
  } catch(err){
    document.body.removeChild(loader);
    alert("⚠️ Server error! Check Node backend.");
    console.error(err);
  }
});
