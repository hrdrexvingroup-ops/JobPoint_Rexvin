const gradeData=[{grade:"VI-B",level:"Director/C-Level",minPoint:4830,maxPoint:6000,gajiMin:51759000,gajiMax:64296000},{grade:"VI-A",level:"Director/C-Level",minPoint:4401,maxPoint:5460,gajiMin:47161000,gajiMax:58510000},{grade:"V-B",level:"Sr. General Manager",minPoint:3651,maxPoint:4800,gajiMin:31300000,gajiMax:47579000},{grade:"V-A",level:"General Manager",minPoint:3001,maxPoint:4380,gajiMin:25727000,gajiMax:37549000},{grade:"IV-B",level:"Sr. Manager / Jr. GM",minPoint:2901,maxPoint:3600,gajiMin:18653000,gajiMax:26040000},{grade:"IV-A",level:"Manager",minPoint:2301,maxPoint:3480,gajiMin:15103000,gajiMax:23308000},{grade:"III-B",level:"Sr. Supervisor / Jr. Manager",minPoint:2001,maxPoint:2760,gajiMin:10186000,gajiMax:15528000},{grade:"III-A",level:"Supervisor",minPoint:1451,maxPoint:2400,gajiMin:7386000,gajiMax:12860000},{grade:"II-D",level:"Sr. Officer / Jr. Supervisor",minPoint:1201,maxPoint:1740,gajiMin:6114000,gajiMax:9323000},{grade:"II-C",level:"Officer",minPoint:1000,maxPoint:1440,gajiMin:5091000,gajiMax:7716000},{grade:"II-B",level:"Officer",minPoint:901,maxPoint:1199,gajiMin:4345000,gajiMax:6424000},{grade:"II-A",level:"Jr. Officer",minPoint:701,maxPoint:1080,gajiMin:3381000,gajiMax:5787000},{grade:"I-B",level:"Sr. Clerk",minPoint:401,maxPoint:840,gajiMin:1934000,gajiMax:5358000},{grade:"I-A",level:"Jr. Clerk",minPoint:300,maxPoint:480,gajiMin:1447000,gajiMax:5358000}];

let currentResult=null;
let evaluationHistory=JSON.parse(localStorage.getItem("evalHistory")||"[]");

window.onload=function(){
    const savedKey=localStorage.getItem("groqApiKey");
    if(savedKey){
        document.getElementById("apiKey").value=savedKey;
        showApiStatus("success","✅ API Key tersimpan");
    }
    loadHistory();
};

function toggleApiKey(){
    const input=document.getElementById("apiKey");
    const icon=document.getElementById("eyeIcon");
    if(input.type==="password"){
        input.type="text";
        icon.className="fas fa-eye-slash";
    }else{
        input.type="password";
        icon.className="fas fa-eye";
    }
}

function saveApiKey(){
    const apiKey=document.getElementById("apiKey").value.trim();
    if(!apiKey){showApiStatus("error","❌ API Key tidak boleh kosong!");return;}
    if(!apiKey.startsWith("gsk_")){showApiStatus("error","❌ Format API Key tidak valid!");return;}
    localStorage.setItem("groqApiKey",apiKey);
    showApiStatus("success","✅ API Key berhasil disimpan!");
}

function showApiStatus(type,message){
    const status=document.getElementById("apiStatus");
    status.style.display="inline-flex";
    status.className="status-badge status-"+type;
    status.innerHTML=message;
}

function getApiKey(){
    return localStorage.getItem("groqApiKey")||document.getElementById("apiKey").value.trim();
}

async function analyzeJob(){
    const apiKey=getApiKey();
    const namaJabatan=document.getElementById("namaJabatan").value.trim();
    const unitKerja=document.getElementById("unitKerja").value.trim();
    const uraian=document.getElementById("uraianJabatan").value.trim();
    const kategori=document.querySelector("input[name='kategori']:checked").value;
    if(!apiKey){alert("⚠️ Silakan masukkan API Key!");return;}
    if(!namaJabatan){alert("⚠️ Silakan masukkan Nama Jabatan!");return;}
    if(!uraian){alert("⚠️ Silakan masukkan Uraian Jabatan!");return;}
    document.getElementById("loadingContainer").style.display="block";
    document.getElementById("card-result").style.display="none";
    document.getElementById("btnAnalyze").disabled=true;
    try{
        const prompt=buildPrompt(kategori,namaJabatan,unitKerja,uraian);
        const responseText=await callGroqAPI(apiKey,prompt);
        const result=parseAIResponse(responseText,namaJabatan,unitKerja,kategori);
        currentResult=result;
        displayResult(result);
        saveToHistory(result);
    }catch(error){
        alert("❌ Terjadi kesalahan: "+error.message);
        console.error(error);
    }finally{
        document.getElementById("loadingContainer").style.display="none";
        document.getElementById("btnAnalyze").disabled=false;
    }
}

function buildPrompt(kategori,namaJabatan,unitKerja,uraian){
    if(kategori==="non-manajerial"){
        return "Anda adalah HRD Manager ahli Job Evaluation FES Non Manajerial. Analisis jabatan berikut dan berikan penilaian FES. JABATAN: "+namaJabatan+" UNIT KERJA: "+unitKerja+" URAIAN: "+uraian+" NILAI FES NON MANAJERIAL: F1-KnowHow: 1-1(50),1-2(200),1-3(350),1-4(550),1-5(750),1-6(950),1-7(1250),1-8(1550),1-9(1850) F2-Pengawasan: 2-1(25),2-2(125),2-3(275),2-4(450),2-5(650) F3-Pedoman: 3-1(25),3-2(125),3-3(275),3-4(450),3-5(650) F4-Kompleksitas: 4-1(25),4-2(75),4-3(150),4-4(225),4-5(325),4-6(450) F5-RuangLingkup: 5-1(25),5-2(75),5-3(150),5-4(225),5-5(325),5-6(450) F6-HubPersonal: 6-1(10),6-2(25),6-3(60),6-4(110) F7-TujuanHub: 7-1(20),7-2(50),7-3(120),7-4(220) F8-TuntutanFisik: 8-1(5),8-2(20),8-3(50) F9-LingkunganKerja: 9-1(5),9-2(20),9-3(50) Berikan response dalam format JSON: {\"faktor\":[{\"no\":1,\"nama\":\"Know How / Pengetahuan & Keahlian\",\"level\":\"1-5\",\"nilai\":750,\"alasan\":\"alasan lengkap\"},{\"no\":2,\"nama\":\"Pengendalian & Pengawasan\",\"level\":\"2-3\",\"nilai\":275,\"alasan\":\"alasan lengkap\"},{\"no\":3,\"nama\":\"Pedoman\",\"level\":\"3-3\",\"nilai\":275,\"alasan\":\"alasan lengkap\"},{\"no\":4,\"nama\":\"Kompleksitas\",\"level\":\"4-3\",\"nilai\":150,\"alasan\":\"alasan lengkap\"},{\"no\":5,\"nama\":\"Ruang Lingkup & Dampak\",\"level\":\"5-3\",\"nilai\":150,\"alasan\":\"alasan lengkap\"},{\"no\":6,\"nama\":\"Hubungan Personal\",\"level\":\"6-3\",\"nilai\":60,\"alasan\":\"alasan lengkap\"},{\"no\":7,\"nama\":\"Tujuan Hubungan\",\"level\":\"7-2\",\"nilai\":50,\"alasan\":\"alasan lengkap\"},{\"no\":8,\"nama\":\"Tuntutan Fisik\",\"level\":\"8-2\",\"nilai\":20,\"alasan\":\"alasan lengkap\"},{\"no\":9,\"nama\":\"Lingkungan Kerja\",\"level\":\"9-2\",\"nilai\":20,\"alasan\":\"alasan lengkap\"}],\"catatan\":\"catatan dan rekomendasi\"} Berikan HANYA JSON tanpa teks lain.";
    }else{
        return "Anda adalah HRD Manager ahli Job Evaluation FES Manajerial. Analisis jabatan berikut dan berikan penilaian FES. JABATAN: "+namaJabatan+" UNIT KERJA: "+unitKerja+" URAIAN: "+uraian+" NILAI FES MANAJERIAL: F1-RuangLingkup: 1-2(660),1-2+(995),1-3(1250),1-4(1495),1-5(1665) F2-Wewenang: 2-1(505),2-2(875),2-3(1015) F3-Koordinasi: 3-1(560),3-2(995),3-3(1250),3-4(1495),3-5(1665) F4-HubPersonal: Sifat1xTujuan1(100),Sifat1xTujuan2(185),Sifat1xTujuan3(230),Sifat1xTujuan4(270),Sifat2xTujuan1(175),Sifat2xTujuan2(260),Sifat2xTujuan3(305),Sifat2xTujuan4(345),Sifat3xTujuan1(245),Sifat3xTujuan2(330),Sifat3xTujuan3(375),Sifat3xTujuan4(415),Sifat4xTujuan1(315),Sifat4xTujuan2(400),Sifat4xTujuan3(445),Sifat4xTujuan4(485) Berikan response dalam format JSON: {\"faktor\":[{\"no\":1,\"nama\":\"Ruang Lingkup Program & Dampak\",\"level\":\"1-3\",\"nilai\":1250,\"alasan\":\"alasan lengkap\"},{\"no\":2,\"nama\":\"Wewenang Supervisi & Manajerial\",\"level\":\"2-2\",\"nilai\":875,\"alasan\":\"alasan lengkap\"},{\"no\":3,\"nama\":\"Koordinasi & Pengintegrasian\",\"level\":\"3-2\",\"nilai\":995,\"alasan\":\"alasan lengkap\"},{\"no\":4,\"nama\":\"Hubungan Personal\",\"level\":\"Sifat2xTujuan2\",\"nilai\":260,\"alasan\":\"alasan lengkap\"}],\"situasiKhusus\":[{\"kondisi\":\"nama kondisi jika ada\",\"poin\":50}],\"catatan\":\"catatan dan rekomendasi\"} Berikan HANYA JSON tanpa teks lain.";
    }
}

async function callGroqAPI(apiKey,prompt){
    const response=await fetch("https://api.groq.com/openai/v1/chat/completions",{
        method:"POST",
        headers:{"Authorization":"Bearer "+apiKey,"Content-Type":"application/json"},
        body:JSON.stringify({model:"llama-3.3-70b-versatile",messages:[{role:"user",content:prompt}],temperature:0.3,max_tokens:4000})
    });
    if(!response.ok){
        const err=await response.json();
        throw new Error(err.error&&err.error.message?err.error.message:"API Error: "+response.status);
    }
    const data=await response.json();
    return data.choices[0].message.content;
}

function parseAIResponse(responseText,namaJabatan,unitKerja,kategori){
    try{
        const jsonMatch=responseText.match(/\{[\s\S]*\}/);
        if(!jsonMatch)throw new Error("Format response tidak valid");
        const parsed=JSON.parse(jsonMatch[0]);
        let totalPoin=parsed.faktor.reduce(function(sum,f){return sum+f.nilai;},0);
        if(kategori==="manajerial"&&parsed.situasiKhusus){
            parsed.situasiKhusus.forEach(function(s){totalPoin+=s.poin||0;});
        }
        const gradeInfo=getGradeByPoint(totalPoin);
        return{namaJabatan:namaJabatan,unitKerja:unitKerja,kategori:kategori,faktor:parsed.faktor,situasiKhusus:parsed.situasiKhusus||[],totalPoin:totalPoin,gradeInfo:gradeInfo,catatan:parsed.catatan||"",tanggal:new Date().toLocaleDateString("id-ID")};
    }catch(error){
        throw new Error("Gagal memproses response AI: "+error.message);
    }
}

function getGradeByPoint(totalPoin){
    let bestMatch=null;
    for(let i=0;i<gradeData.length;i++){
        const grade=gradeData[i];
        if(totalPoin>=grade.minPoint&&totalPoin<=grade.maxPoint){
            if(!bestMatch||grade.minPoint>bestMatch.minPoint){
                bestMatch=grade;
            }
        }
    }
    if(!bestMatch){
        if(totalPoin<300){
            bestMatch=gradeData[gradeData.length-1];
        }else{
            bestMatch=gradeData[0];
        }
    }
    const gajiMid=Math.round((bestMatch.gajiMin+bestMatch.gajiMax)/2);
    return{grade:bestMatch.grade,level:bestMatch.level,minPoint:bestMatch.minPoint,maxPoint:bestMatch.maxPoint,gajiMin:bestMatch.gajiMin,gajiMax:bestMatch.gajiMax,gajiMid:gajiMid};
}

function formatCurrency(amount){
    return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0}).format(amount);
}

function displayResult(result){
    document.getElementById("resultNamaJabatan").textContent=result.namaJabatan;
    document.getElementById("resultUnitKerja").textContent=result.unitKerja;
    document.getElementById("resultKategori").textContent=result.kategori==="non-manajerial"?"Non Manajerial":"Manajerial";
    document.getElementById("totalPoint").textContent=result.totalPoin;
    document.getElementById("totalPointFoot").textContent=result.totalPoin;
    const tbody=document.getElementById("evalTableBody");
    tbody.innerHTML="";
    result.faktor.forEach(function(f,index){
        const tr=document.createElement("tr");
        tr.innerHTML="<td>"+(f.no||index+1)+"</td><td><strong>"+f.nama+"</strong></td><td><span style='background:#1e3a5f;color:white;padding:3px 10px;border-radius:12px;font-size:0.8rem'>Level "+f.level+"</span></td><td><strong>"+f.nilai+"</strong></td><td>"+f.alasan+"</td>";
        tbody.appendChild(tr);
    });
    if(result.situasiKhusus&&result.situasiKhusus.length>0){
        result.situasiKhusus.forEach(function(s){
            if(s.kondisi&&s.poin>0){
                const tr=document.createElement("tr");
                tr.style.background="#fff3cd";
                tr.innerHTML="<td>+</td><td><strong>Situasi Khusus</strong></td><td>"+s.kondisi+"</td><td><strong>+"+s.poin+"</strong></td><td>Tambahan poin situasi khusus</td>";
                tbody.appendChild(tr);
            }
        });
    }
    const g=result.gradeInfo;
    document.getElementById("resultGrade").textContent=g.grade;
    document.getElementById("resultLevel").textContent=g.level;
    document.getElementById("resultRangePoint").textContent=g.minPoint+" - "+g.maxPoint;
    document.getElementById("resultGajiMin").textContent=formatCurrency(g.gajiMin);
    document.getElementById("resultGajiMid").textContent=formatCurrency(g.gajiMid);
    document.getElementById("resultGajiMax").textContent=formatCurrency(g.gajiMax);
    document.getElementById("notesContent").innerHTML="<p>"+result.catatan+"</p>";
    document.getElementById("card-result").style.display="block";
    document.getElementById("card-result").scrollIntoView({behavior:"smooth"});
}

function exportToExcel(){
    if(!currentResult)return;
    const r=currentResult;
    const g=r.gradeInfo;
    const wsData=[
        ["JOB EVALUATION - FACTOR EVALUATION SYSTEM (FES)"],
        [""],
        ["Nama Jabatan",r.namaJabatan],
        ["Unit Kerja",r.unitKerja],
        ["Kategori",r.kategori==="non-manajerial"?"Non Manajerial":"Manajerial"],
        ["Tanggal Evaluasi",r.tanggal],
        [""],
        ["DETAIL PENILAIAN PER FAKTOR"],
        ["No","Faktor","Level","Nilai","Alasan Penilaian"]
    ];
    r.faktor.forEach(function(f,i){
        wsData.push([i+1,f.nama,"Level "+f.level,f.nilai,f.alasan]);
    });
    if(r.situasiKhusus&&r.situasiKhusus.length>0){
        r.situasiKhusus.forEach(function(s){
            if(s.kondisi&&s.poin>0){
                wsData.push(["+","Situasi Khusus",s.kondisi,s.poin,"Tambahan poin situasi khusus"]);
            }
        });
    }
    wsData.push(["","","TOTAL POIN",r.totalPoin,""]);
    wsData.push([""]);
    wsData.push(["HASIL PENEMPATAN GRADE & GAJI"]);
    wsData.push(["Grade",g.grade]);
    wsData.push(["Level Jabatan",g.level]);
    wsData.push(["Range Point",g.minPoint+" - "+g.maxPoint]);
    wsData.push(["Gaji Minimum",g.gajiMin]);
    wsData.push(["Gaji Midpoint",g.gajiMid]);
    wsData.push(["Gaji Maximum",g.gajiMax]);
    wsData.push([""]);
    wsData.push(["CATATAN & REKOMENDASI"]);
    wsData.push([r.catatan]);
    const wb=XLSX.utils.book_new();
    const ws=XLSX.utils.aoa_to_sheet(wsData);
    ws["!cols"]=[{wch:5},{wch:35},{wch:15},{wch:10},{wch:60}];
    XLSX.utils.book_append_sheet(wb,ws,"Job Evaluation");
    XLSX.writeFile(wb,"JobEval_"+r.namaJabatan+"_"+r.tanggal+".xlsx");
}

function exportAllToExcel(){
    if(evaluationHistory.length===0){alert("Belum ada data evaluasi!");return;}
    const wsData=[
        ["REKAP JOB EVALUATION - SEMUA JABATAN"],
        [""],
        ["No","Nama Jabatan","Unit Kerja","Kategori","Total Poin","Grade","Level Jabatan","Range Point","Gaji Min","Gaji Mid","Gaji Max","Tanggal"]
    ];
    evaluationHistory.forEach(function(r,i){
        const g=r.gradeInfo;
        wsData.push([i+1,r.namaJabatan,r.unitKerja,r.kategori==="non-manajerial"?"Non Manajerial":"Manajerial",r.totalPoin,g.grade,g.level,g.minPoint+" - "+g.maxPoint,g.gajiMin,g.gajiMid,g.gajiMax,r.tanggal]);
    });
    const wb=XLSX.utils.book_new();
    const ws=XLSX.utils.aoa_to_sheet(wsData);
    ws["!cols"]=[{wch:5},{wch:30},{wch:25},{wch:15},{wch:12},{wch:10},{wch:25},{wch:15},{wch:18},{wch:18},{wch:18},{wch:15}];
    XLSX.utils.book_append_sheet(wb,ws,"Rekap Semua Jabatan");
    XLSX.writeFile(wb,"Rekap_JobEval_"+new Date().toLocaleDateString("id-ID")+".xlsx");
}

function saveToHistory(result){
    evaluationHistory.unshift(result);
    if(evaluationHistory.length>50){evaluationHistory=evaluationHistory.slice(0,50);}
    localStorage.setItem("evalHistory",JSON.stringify(evaluationHistory));
    loadHistory();
}

function loadHistory(){
    const tbody=document.getElementById("historyTableBody");
    if(!tbody)return;
    if(evaluationHistory.length===0){
        document.getElementById("card-history").style.display="none";
        return;
    }
    document.getElementById("card-history").style.display="block";
    tbody.innerHTML="";
    evaluationHistory.forEach(function(r,i){
        const g=r.gradeInfo;
        const tr=document.createElement("tr");
        tr.innerHTML="<td>"+(i+1)+"</td><td><strong>"+r.namaJabatan+"</strong></td><td>"+r.unitKerja+"</td><td>"+(r.kategori==="non-manajerial"?"Non Manajerial":"Manajerial")+"</td><td><strong>"+r.totalPoin+"</strong></td><td><span style='background:#1e3a5f;color:white;padding:3px 10px;border-radius:12px;font-size:0.8rem'>"+g.grade+"</span></td><td>"+formatCurrency(g.gajiMin)+"</td><td>"+formatCurrency(g.gajiMax)+"</td><td><button onclick='viewHistory("+i+")' class='btn btn-primary btn-sm'><i class='fas fa-eye'></i></button> <button onclick='deleteHistory("+i+")' class='btn btn-danger btn-sm'><i class='fas fa-trash'></i></button></td>";
        tbody.appendChild(tr);
    });
}

function viewHistory(index){
    const result=evaluationHistory[index];
    currentResult=result;
    displayResult(result);
}

function deleteHistory(index){
    if(confirm("Hapus data ini?")){
        evaluationHistory.splice(index,1);
        localStorage.setItem("evalHistory",JSON.stringify(evaluationHistory));
        loadHistory();
    }
}

function clearHistory(){
    if(confirm("Hapus semua riwayat evaluasi?")){
        evaluationHistory=[];
        localStorage.setItem("evalHistory",JSON.stringify(evaluationHistory));
        loadHistory();
    }
}

function resetForm(){
    document.getElementById("namaJabatan").value="";
    document.getElementById("unitKerja").value="";
    document.getElementById("uraianJabatan").value="";
    document.querySelector("input[name='kategori'][value='non-manajerial']").checked=true;
    document.getElementById("card-result").style.display="none";
    window.scrollTo({top:0,behavior:"smooth"});
}
