// =============================================
// DATA GRADE & SALARY
// =============================================
const gradeData = [
    { grade: 'VI-B', level: 'Director/C-Level', minPoint: 4830, maxPoint: 6000, gajiMin: 51759000, gajiMax: 64296000 },
    { grade: 'VI-A', level: 'Director/C-Level', minPoint: 4401, maxPoint: 5460, gajiMin: 47161000, gajiMax: 58510000 },
    { grade: 'V-B', level: 'Sr. General Manager', minPoint: 3651, maxPoint: 4800, gajiMin: 31300000, gajiMax: 47579000 },
    { grade: 'V-A', level: 'General Manager', minPoint: 3001, maxPoint: 4380, gajiMin: 25727000, gajiMax: 37549000 },
    { grade: 'IV-B', level: 'Sr. Manager / Jr. GM', minPoint: 2901, maxPoint: 3600, gajiMin: 18653000, gajiMax: 26040000 },
    { grade: 'IV-A', level: 'Manager', minPoint: 2301, maxPoint: 3480, gajiMin: 15103000, gajiMax: 23308000 },
    { grade: 'III-B', level: 'Sr. Supervisor / Jr. Manager', minPoint: 2001, maxPoint: 2760, gajiMin: 10186000, gajiMax: 15528000 },
    { grade: 'III-A', level: 'Supervisor', minPoint: 1451, maxPoint: 2400, gajiMin: 7386000, gajiMax: 12860000 },
    { grade: 'II-D', level: 'Sr. Officer / Jr. Supervisor', minPoint: 1201, maxPoint: 1740, gajiMin: 6114000, gajiMax: 9323000 },
    { grade: 'II-C', level: 'Officer', minPoint: 1000, maxPoint: 1440, gajiMin: 5091000, gajiMax: 7716000 },
    { grade: 'II-B', level: 'Officer', minPoint: 901, maxPoint: 1199, gajiMin: 4345000, gajiMax: 6424000 },
    { grade: 'II-A', level: 'Jr. Officer', minPoint: 701, maxPoint: 1080, gajiMin: 3381000, gajiMax: 5787000 },
    { grade: 'I-B', level: 'Sr. Clerk', minPoint: 401, maxPoint: 840, gajiMin: 1934000, gajiMax: 5358000 },
    { grade: 'I-A', level: 'Jr. Clerk', minPoint: 300, maxPoint: 480, gajiMin: 1447000, gajiMax: 5358000 }
];

// =============================================
// PANDUAN FES NON MANAJERIAL
// =============================================
const fesNonManajerial = {
    faktor1: {
        nama: 'Know How / Pengetahuan & Keahlian',
        levels: [
            { level: '1-1', nilai: 50 },
            { level: '1-2', nilai: 200 },
            { level: '1-3', nilai: 350 },
            { level: '1-4', nilai: 550 },
            { level: '1-5', nilai: 750 },
            { level: '1-6', nilai: 950 },
            { level: '1-7', nilai: 1250 },
            { level: '1-8', nilai: 1550 },
            { level: '1-9', nilai: 1850 }
        ]
    },
    faktor2: {
        nama: 'Pengendalian & Pengawasan',
        levels: [
            { level: '2-1', nilai: 25 },
            { level: '2-2', nilai: 125 },
            { level: '2-3', nilai: 275 },
            { level: '2-4', nilai: 450 },
            { level: '2-5', nilai: 650 }
        ]
    },
    faktor3: {
        nama: 'Pedoman',
        levels: [
            { level: '3-1', nilai: 25 },
            { level: '3-2', nilai: 125 },
            { level: '3-3', nilai: 275 },
            { level: '3-4', nilai: 450 },
            { level: '3-5', nilai: 650 }
        ]
    },
    faktor4: {
        nama: 'Kompleksitas',
        levels: [
            { level: '4-1', nilai: 25 },
            { level: '4-2', nilai: 75 },
            { level: '4-3', nilai: 150 },
            { level: '4-4', nilai: 225 },
            { level: '4-5', nilai: 325 },
            { level: '4-6', nilai: 450 }
        ]
    },
    faktor5: {
        nama: 'Ruang Lingkup & Dampak',
        levels: [
            { level: '5-1', nilai: 25 },
            { level: '5-2', nilai: 75 },
            { level: '5-3', nilai: 150 },
            { level: '5-4', nilai: 225 },
            { level: '5-5', nilai: 325 },
            { level: '5-6', nilai: 450 }
        ]
    },
    faktor6: {
        nama: 'Hubungan Personal',
        levels: [
            { level: '6-1', nilai: 10 },
            { level: '6-2', nilai: 25 },
            { level: '6-3', nilai: 60 },
            { level: '6-4', nilai: 110 }
        ]
    },
    faktor7: {
        nama: 'Tujuan Hubungan',
        levels: [
            { level: '7-1', nilai: 20 },
            { level: '7-2', nilai: 50 },
            { level: '7-3', nilai: 120 },
            { level: '7-4', nilai: 220 }
        ]
    },
    faktor8: {
        nama: 'Tuntutan Fisik',
        levels: [
            { level: '8-1', nilai: 5 },
            { level: '8-2', nilai: 20 },
            { level: '8-3', nilai: 50 }
        ]
    },
    faktor9: {
        nama: 'Lingkungan Kerja',
        levels: [
            { level: '9-1', nilai: 5 },
            { level: '9-2', nilai: 20 },
            { level: '9-3', nilai: 50 }
        ]
    }
};

// =============================================
// PANDUAN FES MANAJERIAL
// =============================================
const fesManajerial = {
    faktor1: {
        nama: 'Ruang Lingkup Program & Dampak',
        levels: [
            { level: '1-2', nilai: 660 },
            { level: '1-2+', nilai: 995 },
            { level: '1-3', nilai: 1250 },
            { level: '1-4', nilai: 1495 },
            { level: '1-5', nilai: 1665 }
        ]
    },
    faktor2: {
        nama: 'Wewenang Supervisi & Manajerial',
        levels: [
            { level: '2-1', nilai: 505 },
            { level: '2-2', nilai: 875 },
            { level: '2-3', nilai: 1015 }
        ]
    },
    faktor3: {
        nama: 'Koordinasi & Pengintegrasian',
        levels: [
            { level: '3-1', nilai: 560 },
            { level: '3-2', nilai: 995 },
            { level: '3-3', nilai: 1250 },
            { level: '3-4', nilai: 1495 },
            { level: '3-5', nilai: 1665 }
        ]
    },
    faktor4: {
        nama: 'Hubungan Personal',
        levels: [
            { level: '4-L1T1', nilai: 100 },
            { level: '4-L1T2', nilai: 185 },
            { level: '4-L1T3', nilai: 230 },
            { level: '4-L1T4', nilai: 270 },
            { level: '4-L2T1', nilai: 175 },
            { level: '4-L2T2', nilai: 260 },
            { level: '4-L2T3', nilai: 305 },
            { level: '4-L2T4', nilai: 345 },
            { level: '4-L3T1', nilai: 245 },
            { level: '4-L3T2', nilai: 330 },
            { level: '4-L3T3', nilai: 375 },
            { level: '4-L3T4', nilai: 415 },
            { level: '4-L4T1', nilai: 315 },
            { level: '4-L4T2', nilai: 400 },
            { level: '4-L4T3', nilai: 445 },
            { level: '4-L4T4', nilai: 485 }
        ]
    }
};

// =============================================
// VARIABEL GLOBAL
// =============================================
let currentResult = null;
let evaluationHistory = JSON.parse(localStorage.getItem('evalHistory') || '[]');

// =============================================
// FUNGSI API KEY
// =============================================
function toggleApiKey() {
    const input = document.getElementById('apiKey');
    const icon = document.getElementById('eyeIcon');
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

function saveApiKey() {
    const apiKey = document.getElementById('apiKey').value.trim();
    if (!apiKey) {
        showApiStatus('error', '❌ API Key tidak boleh kosong!');
        return;
    }
    if (!apiKey.startsWith('gsk_')) {
        showApiStatus('error', '❌ Format API Key tidak valid! Harus dimulai dengan gsk_');
        return;
    }
    localStorage.setItem('groqApiKey', apiKey);
    showApiStatus('success', '✅ API Key berhasil disimpan!');
}

function showApiStatus(type, message) {
    const status = document.getElementById('apiStatus');
    status.style.display = 'inline-flex';
    status.className = `status-badge status-${type}`;
    status.innerHTML = message;
}

function getApiKey() {
    return localStorage.getItem('groqApiKey') || document.getElementById('apiKey').value.trim();
}

// =============================================
// FUNGSI UTAMA ANALISIS
// =============================================
async function analyzeJob() {
    const apiKey = getApiKey();
    const namaJabatan = document.getElementById('namaJabatan').value.trim();
    const unitKerja = document.getElementById('unitKerja').value.trim();
    const uraian = document.getElementById('uraianJabatan').value.trim();
    const kategori = document.querySelector('input[name="kategori"]:checked').value;

    // VALIDASI
    if (!apiKey) {
        alert('⚠️ Silakan masukkan API Key terlebih dahulu!');
        return;
    }
    if (!namaJabatan) {
        alert('⚠️ Silakan masukkan Nama Jabatan!');
        return;
    }
    if (!uraian) {
        alert('⚠️ Silakan masukkan Uraian Jabatan!');
        return;
    }

    // TAMPILKAN LOADING
    document.getElementById('loadingContainer').style.display = 'block';
    document.getElementById('card-result').style.display = 'none';
    document.getElementById('btnAnalyze').disabled = true;

    try {
        const prompt = buildPrompt(kategori, namaJabatan, unitKerja, uraian);
        const response = await callGroqAPI(apiKey, prompt);
        const result = parseAIResponse(response, namaJabatan, unitKerja, kategori);
        
        currentResult = result;
        displayResult(result);
        saveToHistory(result);
        
    } catch (error) {
        alert('❌ Terjadi kesalahan: ' + error.message);
        console.error(error);
    } finally {
        document.getElementById('loadingContainer').style.display = 'none';
        document.getElementById('btnAnalyze').disabled = false;
    }
}

// =============================================
// BUILD PROMPT
// =============================================
function buildPrompt(kategori, namaJabatan, unitKerja, uraian) {
    if (kategori === 'non-manajerial') {
        return `Anda adalah HRD Manager ahli dalam Job Evaluation menggunakan metode Factor Evaluation System (FES) Non Manajerial.

Analisis uraian jabatan berikut dan berikan penilaian untuk setiap faktor FES Non Manajerial.

JABATAN: ${namaJabatan}
UNIT KERJA: ${unitKerja}
URAIAN JABATAN:
${uraian}

PANDUAN NILAI FES NON MANAJERIAL:
Faktor 1 - Know How: Level 1-1(50), 1-2(200), 1-3(350), 1-4(550), 1-5(750), 1-6(950), 1-7(1250), 1-8(1550), 1-9(1850)
Faktor 2 - Pengendalian & Pengawasan: Level 2-1(25), 2-2(125), 2-3(275), 2-4(450), 2-5(650)
Faktor 3 - Pedoman: Level 3-1(25), 3-2(125), 3-3(275), 3-4(450), 3-5(650)
Faktor 4 - Kompleksitas: Level 4-1(25), 4-2(75), 4-3(150), 4-4(225), 4-5(325), 4-6(450)
Faktor 5 - Ruang Lingkup & Dampak: Level 5-1(25), 5-2(75), 5-3(150), 5-4(225), 5-5(325), 5-6(450)
Faktor 6 - Hubungan Personal: Level 6-1(10), 6-2(25), 6-3(60), 6-4(110)
Faktor 7 - Tujuan Hubungan
