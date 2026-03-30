async function test() {
    const res = await fetch('http://localhost:5000/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 1, title: "My Reminder", due_date: "" })
    });
    console.log("Status:", res.status);
    console.log("Data:", await res.text());
}
test();
