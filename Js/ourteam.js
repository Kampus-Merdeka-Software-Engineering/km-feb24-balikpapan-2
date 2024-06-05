// document.addEventListener('DOMContentLoaded', function() {
//     const teamMembers = document.querySelectorAll('box');
//     const infoBox = document.getElementById('info-box');
//     const infoText1 = document.getElementById('info-text-1');
//     const infoText2 = document.getElementById('info-text-2');
//     const closeBtn = document.getElementById('close-btn');

//     const memberInfo = {
//         1: ['Anggota 1 berasal dari Jakarta.', 'Posisi: Developer'],
//         2: ['Anggota 2 berasal dari Surabaya.', 'Posisi: Designer'],
//         3: ['Anggota 3 berasal dari Bandung.', 'Posisi: Manager']
//     };

//     teamMembers.forEach(member => {
//         member.addEventListener('click', function() {
//             const memberId = this.getAttribute('data-team');
//             infoText1.textContent = memberInfo[memberId][0];
//             infoText2.textContent = memberInfo[memberId][1];
//             infoBox.style.display = 'block';
//         });
//     });

//     closeBtn.addEventListener('click', function() {
//         infoBox.style.display = 'none';
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    const teamMembers = document.querySelectorAll('.col-4');
    const infoBox = document.getElementById('info-box');
    const infoText1 = document.getElementById('info-text-1');
    const infoText2 = document.getElementById('info-text-2');
    const infoText3 = document.getElementById('info-text-3');
    const infoText4 = document.getElementById('info-text-4');
    const closeBtn = document.getElementById('close-btn');

    const memberInfo = {
        1: ['Haikal Muhammad Akbar', 'Universitas Indonesia', 'Team Leader', '@bay_haikal'],
        2: ['Cindi Karolin', 'Universitas Sriwijaya', 'Quality Assurance', '@cindikrlinn'],
        3: ['Kholid Fauzy', 'Universitas Amikom Yogyakarta', 'Chart Development', '@kholid_fauzy'],
        4: ['Rini Kurniasih', 'Universitas Islam Bandung', 'Pitch Deck', '@k.rrin_'],
        5: ['Hikma Abdia', 'Universitas Hasanudin', 'Pitch Deck' , '@_abdiaaa'],
        6: ['Irgy Dwi V', 'Universitas Tanjungpura', 'Deployment', '@irgy_dr'],
        7: ['Made Shanta Raima W', 'Universitas Udayana', 'Form Validation', '@shanta.raima14'],
        8: ['Mufidatul Izza', '', '', ''],
        9: ['Kevin Kurnia', '', '', ''],
        10: ['Nova Enjelina P', 'Universitas Pembangunan Nasional Veteran Jakarta', 'Front End', '@novanjln'],
        11: ['Amelia Putri Rosalina', '', '', ''],
        12: ['Eolia Gita Afriyani', 'Universitas Jember', 'Pitch Deck', '@eo_gita'],
        13: ['Ainur Rokhimah', '', '', '']
    };

    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            const memberId = this.getAttribute('data-team');
            infoText1.textContent = memberInfo[memberId][0];
            infoText2.textContent = memberInfo[memberId][1];
            infoText3.textContent = memberInfo[memberId][2];
            infoText4.textContent = memberInfo[memberId][3]
            infoBox.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function() {
        infoBox.style.display = 'none';
    });
});

// document.addEventListener('DOMContentLoaded', function() {
//     const teamMembers = document.querySelectorAll('.col-4');

//     const memberInfo = {
//         1: ['Anggota 1 berasal dari Jakarta.', 'Posisi: Developer'],
//         2: ['Anggota 2 berasal dari Surabaya.', 'Posisi: Designer'],
//         3: ['Anggota 3 berasal dari Bandung.', 'Posisi: Manager']
//     };

//     teamMembers.forEach(member => {
//         member.addEventListener('click', function() {
//             const memberId = this.getAttribute('data-member');
//             const infoBox = this.querySelector('.info-box');
//             const infoText1 = infoBox.querySelector('.info-text-1');
//             const infoText2 = infoBox.querySelector('.info-text-2');
            
//             infoText1.textContent = memberInfo[memberId][0];
//             infoText2.textContent = memberInfo[memberId][1];

//             if (infoBox.style.display === 'block') {
//                 infoBox.style.display = 'none';
//             } else {
//                 closeAllInfoBoxes();
//                 infoBox.style.display = 'block';
//             }
//         });
//     });

//     function closeAllInfoBoxes() {
//         document.querySelectorAll('.info-box').forEach(box => {
//             box.style.display = 'none';
//         });
//     }

//     document.addEventListener('click', function(e) {
//         if (!e.target.closest('.team-member')) {
//             closeAllInfoBoxes();
//         }
//     });
// });
