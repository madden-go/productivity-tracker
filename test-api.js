async function testAPI() {
  try {
    const res = await fetch('http://localhost:5173/api/reminders');
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text.substring(0, 100));
  } catch(e) { console.error(e); }
}
testAPI();
