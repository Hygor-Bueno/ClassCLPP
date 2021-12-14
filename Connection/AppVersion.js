export class AppVersion {
  async main() {
    const req = await fetch(
      `http://192.168.0.99:71/GLOBAL/Controller/CCPP/AppVersion.php?id=7`,
      { method: "GET" }
    );
    let json = await req.json();
    let version = "0.1a";
    let controlVersion = json.data[0].version;
    let response = true;
    if (controlVersion !== version) {
      response = false;
    }
    return response;
  }
}
