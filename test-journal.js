async function test() {
    try {
        const res = await fetch('http://localhost:5000/api/journals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: 1, entry: "My entry test", date: "2023-10-10" })
        });
        console.log("Status:", res.status);
        console.log("Data:", await res.text());
    } catch(e) { console.error(e); }
}
test();
