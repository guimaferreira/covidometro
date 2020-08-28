import fetch from "node-fetch";

export async function getCityDiagnosis() {
    // Instead of the file system,
    // fetch post data from an external API endpoint
    const res = await fetch(
        "https://opencodex.s3.us-south.cloud-object-storage.appdomain.cloud/covidometro/mg-claudio.json"
    );

    return res.json();
}
