document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu when clicking links
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Number Counter Animation
    const statsSection = document.querySelector('.info-parallax');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateCounters = () => {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target;
                }
            };
            
            updateCounter();
        });
    };

    // Intersection Observer for the stats animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                animateCounters();
                hasAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        observer.observe(statsSection);
    }

    // Attraction Data for Modal
    const attractionsData = {
        'dutaeyeon': {
            title: '두타연',
            tag: '자연/생태',
            image: 'images/dutaeyeon_valley_1779164935422.png',
            desc: '민통선 내 천혜의 비경을 간직한 생태계의 보고입니다. 한국전쟁 이후 반세기 동안 민간인의 출입이 통제되어 멸종 위기종인 열목어, 산양 등이 서식하는 등 원시 자연 그대로의 모습을 간직하고 있습니다. 맑은 계곡물과 폭포, 그리고 울창한 숲이 어우러져 사계절 내내 절경을 자랑합니다.',
            details: '<p><i class="fas fa-map-marker-alt"></i> 강원특별자치도 양구군 방산면 두타연로 297</p><p><i class="fas fa-clock"></i> 매일 09:00 - 17:00 (사전 출입신청 필수)</p>'
        },
        'punchbowl': {
            title: '해안분지 (펀치볼)',
            tag: '경관/지질',
            image: 'images/punchbowl_landscape_1779164916970.png',
            desc: '해발 1,000m가 넘는 대암산, 도솔산 등에 둘러싸인 거대한 화채그릇 모양의 침식분지입니다. 한국전쟁 당시 외국 종군기자가 그 모습을 보고 "펀치볼(Punchbowl)"이라고 부른 데서 유래했습니다. 이른 아침 안개가 피어오를 때 도솔산이나 을지전망대에서 내려다보는 풍경은 그야말로 장관입니다.',
            details: '<p><i class="fas fa-map-marker-alt"></i> 강원특별자치도 양구군 해안면 일대</p><p><i class="fas fa-info-circle"></i> 주변 안보관광지(제4땅굴, 을지전망대) 연계 관람 추천</p>'
        },
        'hanbando': {
            title: '한반도섬',
            tag: '공원/휴양',
            image: 'images/hanbando_island_1779165948100.png',
            desc: '파로호 상류에 국내 최대 규모로 조성된 인공 습지입니다. 하늘에서 내려다보면 한반도 지형을 그대로 축소해 놓은 모양을 하고 있어 "한반도섬"이라고 불립니다. 섬 내부에는 제주도, 지리산, 한라산 등 전국 주요 명소의 축소판이 꾸며져 있으며, 짚라인, 오리배 등 다양한 즐길거리와 수변 산책로가 조성되어 있어 가족 단위 나들이에 최적입니다.',
            details: '<p><i class="fas fa-map-marker-alt"></i> 강원특별자치도 양구군 양구읍 하리</p><p><i class="fas fa-parking"></i> 무료 주차장 완비, 짚라인 별도 요금</p>'
        },
        'museum': {
            title: '박수근미술관',
            tag: '문화/예술',
            image: 'images/park_sugeun_museum_1779165965394.png',
            desc: '한국 근현대미술의 거장, 국민 화가로 불리는 박수근 선생의 생가터에 건립된 미술관입니다. 서민들의 삶의 애환을 화강암처럼 투박한 질감과 따뜻한 시선으로 그려낸 그의 작품 세계를 온전히 느낄 수 있습니다. 미술관 자체가 하나의 거대한 예술 작품처럼 아름답게 디자인되어 있어, 주변의 고즈넉한 자연과 함께 사색하고 힐링하기에 완벽한 장소입니다.',
            details: '<p><i class="fas fa-map-marker-alt"></i> 강원특별자치도 양구군 양구읍 박수근로 265-15</p><p><i class="fas fa-clock"></i> 매일 09:00 - 18:00 (월요일 휴관)</p>'
        }
    };

    const modalOverlay = document.getElementById('attraction-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const btnModals = document.querySelectorAll('.btn-modal');
    
    // Modal Elements
    const modalImg = document.getElementById('modal-img');
    const modalTagText = document.getElementById('modal-tag-text');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalDetails = document.getElementById('modal-details');

    // Open Modal Function
    btnModals.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            const data = attractionsData[id];

            if (data) {
                modalImg.src = data.image;
                modalTagText.innerText = data.tag;
                modalTitle.innerText = data.title;
                modalDesc.innerText = data.desc;
                modalDetails.innerHTML = data.details;

                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    // Close Modal Function
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    modalCloseBtn.addEventListener('click', closeModal);

    // Close modal on clicking outside the modal content
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Fortune Cookie Logic
    const fortuneModal = document.getElementById('fortune-modal');
    const fortuneCloseBtn = document.getElementById('fortune-close-btn');
    const parallaxSection = document.querySelector('.info-parallax');
    const fortuneIcon = document.getElementById('fortune-cookie-icon');
    const fortuneMessage = document.getElementById('fortune-message');

    const fortunes = [
        "국토의 정중앙 양구에 오시면 잃어버렸던 건강이 회복됩니다.",
        "국토의 정중앙 양구에 오시면 막혔던 재물운이 뻥 뚫립니다.",
        "국토의 정중앙 양구에 오시면 새로운 사랑이 시작됩니다.",
        "국토의 정중앙 양구에 오시면 모든 근심걱정이 눈 녹듯 사라집니다.",
        "국토의 정중앙 양구에 오시면 생각지도 못한 뜻밖의 행운이 찾아옵니다.",
        "국토의 정중앙 양구에 오시면 소망하던 일이 마침내 이루어집니다."
    ];

    if (parallaxSection) {
        parallaxSection.addEventListener('click', () => {
            // Open modal
            fortuneModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Reset to initial state
            fortuneIcon.innerText = '🥠';
            fortuneMessage.innerText = '포춘 쿠키를 여는 중...';
            fortuneMessage.style.opacity = '0.5';

            // Start shaking animation
            fortuneIcon.classList.remove('shake');
            void fortuneIcon.offsetWidth; // trigger reflow
            fortuneIcon.classList.add('shake');

            // After 1 second, open cookie and show message
            setTimeout(() => {
                fortuneIcon.classList.remove('shake');
                fortuneIcon.innerText = '📜'; // scroll or open message icon
                const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
                fortuneMessage.innerText = randomFortune;
                fortuneMessage.style.opacity = '1';
            }, 1000);
        });
    }

    const closeFortuneModal = () => {
        fortuneModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (fortuneCloseBtn) {
        fortuneCloseBtn.addEventListener('click', closeFortuneModal);
    }
    
    if (fortuneModal) {
        fortuneModal.addEventListener('click', (e) => {
            if (e.target === fortuneModal) closeFortuneModal();
        });
    }

    // Map Viewer Modal Logic
    const mapDownloadBtn = document.getElementById('download-map-btn');
    const mapModal = document.getElementById('map-modal');
    const mapCloseBtn = document.getElementById('map-close-btn');

    if (mapDownloadBtn && mapModal) {
        mapDownloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mapModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    const closeMapModal = () => {
        mapModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (mapCloseBtn) mapCloseBtn.addEventListener('click', closeMapModal);

    if (mapModal) {
        mapModal.addEventListener('click', (e) => {
            if (e.target === mapModal) closeMapModal();
        });
    }

    // Food & Accommodation Modal Logic
    const foodBtn = document.getElementById('food-modal-btn');
    const foodModal = document.getElementById('food-modal');
    const foodCloseBtn = document.getElementById('food-close-btn');

    if (foodBtn && foodModal) {
        foodBtn.addEventListener('click', (e) => {
            e.preventDefault();
            foodModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    const closeFoodModal = () => {
        foodModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (foodCloseBtn) foodCloseBtn.addEventListener('click', closeFoodModal);

    if (foodModal) {
        foodModal.addEventListener('click', (e) => {
            if (e.target === foodModal) closeFoodModal();
        });
    }

    // Modal Tab Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // BGM Logic
    const bgm = document.getElementById('bgm');
    const bgmToggle = document.getElementById('bgm-toggle');
    let hasInteracted = false;

    if (bgm && bgmToggle) {
        bgmToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the -10 years effect when clicking this button
            if (bgm.paused) {
                bgm.play().then(() => {
                    bgmToggle.classList.add('playing');
                    bgmToggle.innerHTML = '<i class="fas fa-music"></i>';
                }).catch(err => console.log(err));
            } else {
                bgm.pause();
                bgmToggle.classList.remove('playing');
                bgmToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
    }

    // "-10 Years" Youth Yanggu Click Effect
    document.body.addEventListener('click', (e) => {
        // Autoplay BGM on first interaction
        if (!hasInteracted && bgm && bgm.paused) {
            hasInteracted = true;
            bgm.play().then(() => {
                if (bgmToggle) {
                    bgmToggle.classList.add('playing');
                    bgmToggle.innerHTML = '<i class="fas fa-music"></i>';
                }
            }).catch(err => console.log("Audio autoplay blocked:", err));
        }
        
        // Create the floating element
        const effect = document.createElement('div');
        effect.className = 'youth-click-effect';
        
        // Use the Yanggu logo and -10 years text
        effect.innerHTML = `<img src="https://www.yanggu.go.kr/resources/images/fnc_images/common/logo.png" alt="양구로고" style="height:24px; vertical-align:middle; margin-right:8px; filter: brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.3));"> -10년`;
        
        // Position at cursor
        effect.style.left = e.pageX + 'px';
        effect.style.top = e.pageY + 'px';
        
        document.body.appendChild(effect);
        
        // Remove after animation
        setTimeout(() => {
            effect.remove();
        }, 1000);
    });

    // --- Puzzle Course Maker Logic ---
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    const puzzleSlots = document.querySelectorAll('.puzzle-slot');
    const generateBtn = document.getElementById('generate-course-btn');
    const resetBtn = document.getElementById('reset-puzzle-btn');
    const courseResult = document.getElementById('course-result');
    const courseTimeline = document.getElementById('course-timeline');

    let draggedPiece = null;

    puzzlePieces.forEach(piece => {
        piece.addEventListener('dragstart', function() {
            draggedPiece = this;
            setTimeout(() => this.style.opacity = '0.5', 0);
        });

        piece.addEventListener('dragend', function() {
            setTimeout(() => this.style.opacity = '1', 0);
            draggedPiece = null;
            checkPuzzleComplete();
        });
    });

    puzzleSlots.forEach(slot => {
        slot.addEventListener('dragover', function(e) {
            e.preventDefault();
            if(!this.querySelector('.puzzle-piece')) {
                this.classList.add('drag-over');
            }
        });

        slot.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });

        slot.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            // Allow drop if empty
            if (!this.querySelector('.puzzle-piece') && draggedPiece) {
                // Clone the piece
                const clone = draggedPiece.cloneNode(true);
                clone.style.opacity = '1';
                clone.removeAttribute('draggable');
                
                // Allow removing it by clicking
                clone.addEventListener('click', () => {
                    clone.remove();
                    checkPuzzleComplete();
                });
                
                this.innerHTML = '';
                this.appendChild(clone);
            }
        });
    });

    function checkPuzzleComplete() {
        let filledCount = 0;
        puzzleSlots.forEach(slot => {
            if (slot.querySelector('.puzzle-piece')) {
                filledCount++;
            } else {
                slot.innerHTML = `<span>코스 ${slot.dataset.step}</span>`; 
            }
        });
        
        if (filledCount > 0) {
            generateBtn.disabled = false;
        } else {
            generateBtn.disabled = true;
            generateBtn.innerHTML = '<i class="fas fa-magic"></i> 맞춤 코스 생성하기';
            courseResult.classList.add('hidden');
        }
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            puzzleSlots.forEach(slot => {
                slot.innerHTML = `<span>코스 ${slot.dataset.step}</span>`;
            });
            courseResult.classList.add('hidden');
            generateBtn.disabled = true;
            generateBtn.innerHTML = '<i class="fas fa-magic"></i> 맞춤 코스 생성하기';
        });
    }

    // Yanggu Tourism Database for generating the timeline
    const yangguData = {
        'attraction': [
            { name: "두타연 생태탐방", desc: "금강산에서 흘러내린 맑은 계곡물과 천혜의 비경을 간직한 생태계의 보고.", icon: "fa-camera" },
            { name: "한반도섬 산책", desc: "파로호 한가운데 조성된 한반도 지형의 인공섬을 여유롭게 거닐어 보세요.", icon: "fa-camera" },
            { name: "박수근 미술관", desc: "양구가 낳은 국민화가 박수근 화백의 따뜻한 예술 혼을 느낄 수 있습니다.", icon: "fa-camera" },
            { name: "을지전망대", desc: "가장 가까이에서 북녘 땅을 조망할 수 있는 안보관광의 1번지입니다.", icon: "fa-camera" }
        ],
        'food': [
            { name: "광치막국수", desc: "시원한 동치미 육수와 메밀향 가득한 양구 대표 막국수 맛집입니다.", icon: "fa-utensils" },
            { name: "시래정", desc: "양구 특산물인 펀치볼 시래기로 만든 건강하고 정갈한 시래기 정식 한 상.", icon: "fa-utensils" },
            { name: "양구수산횟집", desc: "청정 파로호에서 갓 잡은 싱싱한 민물회와 얼큰한 매운탕을 즐기세요.", icon: "fa-utensils" }
        ],
        'nopo': [
            { name: "옥천식당 (양구 내장국밥)", desc: "양구 중앙시장에서 40년 이상 자리를 지킨 찐 로컬 내장국밥 맛집.", icon: "fa-store-alt" },
            { name: "도촌막국수", desc: "세월의 흔적이 묻어나는 도촌리 노포. 양구 토박이들이 사랑하는 막국수집.", icon: "fa-store-alt" },
            { name: "전주식당", desc: "정겨운 촌두부구이와 김치찌개로 수십 년간 양구 군민의 입맛을 사로잡은 곳.", icon: "fa-store-alt" }
        ],
        'cafe': [
            { name: "까페 1001", desc: "양구 시내가 한눈에 내려다보이는 전망 좋은 언덕 위의 감성 카페입니다.", icon: "fa-coffee" },
            { name: "배꼽제빵소", desc: "국토정중앙 양구의 특색 있는 베이커리와 향긋한 커피를 맛볼 수 있습니다.", icon: "fa-coffee" },
            { name: "백자박물관 카페", desc: "양구 백자의 단아한 아름다움을 감상하며 우아하게 차 한 잔의 여유를.", icon: "fa-coffee" }
        ],
        'leisure': [
            { name: "국토정중앙천문대", desc: "국토 정중앙의 맑은 하늘에서 밤하늘에 쏟아지는 별과 은하수를 관측하세요.", icon: "fa-bicycle" },
            { name: "한반도섬 짚라인", desc: "파로호 위를 가로지르며 시원한 바람과 짜릿한 스릴을 만끽하는 액티비티!", icon: "fa-bicycle" },
            { name: "양구수목원", desc: "가족과 함께 피톤치드 가득한 숲속 놀이터와 거대한 생태 식물원을 즐기세요.", icon: "fa-bicycle" }
        ],
        'hotel': [
            { name: "KCP호텔", desc: "양구 시내에 위치해 접근성이 좋고 깔끔한 객실을 자랑하는 대표 호텔.", icon: "fa-bed" },
            { name: "광치자연휴양림", desc: "울창한 숲 속 통나무집에서 대자연과 하나되는 진정한 힐링의 하룻밤.", icon: "fa-bed" },
            { name: "양구 펜션마을", desc: "별빛이 쏟아지는 계곡 옆에서 바베큐를 즐길 수 있는 아늑한 펜션.", icon: "fa-bed" }
        ]
    };

    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            const selectedTypes = [];
            puzzleSlots.forEach(slot => {
                const piece = slot.querySelector('.puzzle-piece');
                if (piece) {
                    selectedTypes.push(piece.dataset.type);
                }
            });
            
            if (selectedTypes.length === 0) return;
            
            let html = '';
            selectedTypes.forEach((type, index) => {
                const options = yangguData[type];
                // Randomly select a place from the category
                const choice = options[Math.floor(Math.random() * options.length)];
                
                html += `
                    <div class="timeline-item">
                        <div class="timeline-icon"><i class="fas ${choice.icon}"></i></div>
                        <div class="timeline-content">
                            <h4>[코스 ${index + 1}] ${choice.name}</h4>
                            <p>${choice.desc}</p>
                        </div>
                    </div>
                `;
            });
            
            courseTimeline.innerHTML = html;
            courseResult.classList.remove('hidden');
            
            // Scroll to the result
            setTimeout(() => {
                courseResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
            
            generateBtn.innerHTML = '<i class="fas fa-magic"></i> 다른 코스로 다시 추천받기';
        });
    }

    // --- Medical Map Logic ---
    const mapTabBtns = document.querySelectorAll('.map-tab-btn');
    const mapContents = document.querySelectorAll('.map-content');
    
    if (mapTabBtns.length > 0) {
        mapTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                mapTabBtns.forEach(b => b.classList.remove('active'));
                mapContents.forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                const target = btn.dataset.map;
                document.getElementById(`map-${target}`).classList.add('active');
            });
        });
    }

    const medMarkers = document.querySelectorAll('.med-marker');
    const medPopup = document.getElementById('med-popup');
    const medTitle = document.getElementById('med-title');
    const medTag = document.getElementById('med-tag');
    const medItems = document.getElementById('med-items');
    const medClose = document.getElementById('med-close');

    if (medMarkers.length > 0 && medPopup) {
        medMarkers.forEach(marker => {
            marker.addEventListener('click', (e) => {
                e.stopPropagation();
                const type = marker.dataset.type;
                medTitle.textContent = marker.dataset.name;
                medTag.textContent = type === 'hospital' ? '병원/응급실' : '약국';
                medTag.className = `med-tag ${type}`;
                medItems.textContent = marker.dataset.items;
                
                medPopup.classList.add('active');
            });
        });

        medClose.addEventListener('click', () => {
            medPopup.classList.remove('active');
        });

        // Close when clicking outside marker
        document.getElementById('map-medical').addEventListener('click', () => {
            medPopup.classList.remove('active');
        });
    }

    // --- Food & Special Products Data ---
    const foodData = {
        'gomchwi': {
            title: '양구 곰취',
            tag: '산채/채소',
            season: '5월 ~ 6월',
            image: 'images/yanggu_gomchwi.png',
            desc: '양구를 대표하는 봄나물로 향미가 쌉쌀하고 독특해 식탁을 건강하게 만드는 웰빙 산채입니다. 곰이 겨울잠에서 깬 뒤 먹는다고 해서 유래되었으며, 매년 5월에는 양구 곰취 축제가 개최됩니다.',
            purchase_season: '4월 ~ 6월 (봄철 집중 수확기)',
            target_age: '40대 ~ 70대 (중장년층 웰빙 건강식 선호)',
            mascot_image: 'images/baekkobi_gomchwi.png',
            baekkobi_tip: '쌉싸름한 곰취에 삼겹살을 싸서 곰취 장아찌와 함께 드셔보꼬비! 입맛 돋우기에 최고이꼬비!',
            efficacy: '항암 효과 및 항산화 작용, 피로 회복, 기침 및 천식 완화',
            storage: '신문지에 싸서 분무기로 물을 뿌려 냉장 보관하거나, 데쳐서 냉동 보관합니다.',
            dishes: '곰취 쌈밥, 곰취 장아찌, 곰취 전, 삼겹살 곰취 쌈, 곰취 나물무침',
            comic_steps: [
                { 
                    num: 1, 
                    image: 'images/baekkobi_gomchwi.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><rect width="100%" height="100%" fill="#e8f5e9"/><path d="M-10,260 Q50,180 110,260 T230,260" fill="#a5d6a7"/><path d="M40,260 Q120,150 200,260" fill="#81c784"/><circle cx="150" cy="60" r="15" fill="#a5d6a7" opacity="0.3"/></svg>',
                    text: '배꼬비와 사과친구 아리는 대암산 깊은 숲속을 걷다 거대한 곰취 잎을 발견했꼬비! 🍀' 
                },
                { 
                    num: 2, 
                    image: 'images/baekkobi_gomchwi.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><defs><linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#80deea"/><stop offset="100%" stop-color="#e0f7fa"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#skyGrad)"/><circle cx="40" cy="80" r="25" fill="#fff" opacity="0.8"/><circle cx="160" cy="60" r="20" fill="#fff" opacity="0.8"/></svg>',
                    text: '"우와! 곰취 잎이 너무 크고 폭신해서 마치 초록색 침대 같꼬비~" 둥실둥실 누워보는 아리 💚' 
                },
                { 
                    num: 3, 
                    image: 'images/baekkobi_gomchwi.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><rect width="100%" height="100%" fill="#b2ebf2"/><line x1="20" y1="50" x2="180" y2="50" stroke="#fff" stroke-width="3" stroke-dasharray="10 5"/><line x1="10" y1="120" x2="190" y2="120" stroke="#fff" stroke-width="4" stroke-dasharray="20 10"/><line x1="30" y1="180" x2="170" y2="180" stroke="#fff" stroke-width="3" stroke-dasharray="15 5"/></svg>',
                    text: '갑자기 곰취가 마법 양탄자처럼 하늘을 슝 날아올랐꼬비! "아리야, 꽉 잡으꼬비! 날아간꼬비~!" 🎈' 
                },
                { 
                    num: 4, 
                    image: 'images/baekkobi_gomchwi.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><defs><linearGradient id="sunsetGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffcc80"/><stop offset="100%" stop-color="#fff3e0"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#sunsetGrad)"/><path d="M-10,260 Q100,210 210,260" fill="#bcaaa4"/><circle cx="100" cy="210" r="15" fill="#ff7043" opacity="0.6"/><path d="M90,210 Q100,170 105,210 T120,210" stroke="#ffeb3b" stroke-width="4" fill="none"/></svg>',
                    text: '착륙 후 캠핑장에서 삼겹살을 곰취 잎에 얹어 다 함께 냠냠! 모험 뒤의 곰취 쌈은 정말 꿀맛이꼬비! 🥓😋' 
                }
            ]
        },
        'asparagus': {
            title: '양구 아스파라거스',
            tag: '산채/채소',
            season: '4월 ~ 10월',
            image: 'images/yanggu_asparagus.png',
            desc: '아삭아삭 씹히는 맛이 특징인 양구 아스파라거스는 큰 일교차 덕분에 품질이 매우 우수하여 해외로 많이 수출되며, 숙취 해소와 다이어트에 효능이 뛰어납니다.',
            purchase_season: '4월 ~ 10월 (봄부터 가을까지 수확)',
            target_age: '20대 ~ 40대 (다이어트 식단 및 요리를 즐기는 젊은 층)',
            mascot_image: 'images/baekkobi_asparagus.png',
            baekkobi_tip: '피로 해소에 좋은 아스파라긴산이 가득하꼬비! 소금과 올리브유를 쳐서 고기와 구워드꼬비!',
            efficacy: '숙취 해소 및 피로 회복, 성인병 예방, 다이어트 효과',
            storage: '밑동을 조금 자르고 젖은 키친타월로 감싸 세워서 냉장 보관합니다.',
            dishes: '아스파라거스 베이컨 말이, 버터구이, 스테이크 가니쉬',
            comic_steps: [
                { 
                    num: 1, 
                    image: 'images/baekkobi_asparagus.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><rect width="100%" height="100%" fill="#efebe9"/><rect x="0" y="0" width="100%" height="60" fill="#d7ccc8"/><line x1="0" y1="60" x2="200" y2="60" stroke="#8d6e63" stroke-width="3"/><rect x="80" y="10" width="40" height="35" rx="5" fill="#fff" stroke="#8d6e63" stroke-width="2"/></svg>',
                    text: '배꼬비와 멜론친구 멜로니가 맛있는 저녁 요리를 준비하고 있었꼬비! "멜로니 요리가 제일 기대된꼬비!"' 
                },
                { 
                    num: 2, 
                    image: 'images/baekkobi_asparagus.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><rect width="100%" height="100%" fill="#fffde7"/><polygon points="100,10 120,80 190,100 130,130 150,210 100,160 50,210 70,130 10,100 80,80" fill="#fff59d" opacity="0.7"/><text x="100" y="70" font-size="50" font-weight="900" fill="#f57f17" text-anchor="middle" font-family="sans-serif">!</text></svg>',
                    text: '"어라? 난 오늘 멜로니 몰래 간식을 하나도 안 훔쳐 먹었꼬비...🤥" 거짓말을 치는 순간 코가 뿅! 😲' 
                },
                { 
                    num: 3, 
                    image: 'images/baekkobi_asparagus.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><rect width="100%" height="100%" fill="#e8f5e9"/><path d="M100,220 L100,30" stroke="#4caf50" stroke-width="6"/><line x1="70" y1="200" x2="70" y2="50" stroke="#81c784" stroke-width="2" stroke-dasharray="5 5"/><line x1="130" y1="200" x2="130" y2="50" stroke="#81c784" stroke-width="2" stroke-dasharray="5 5"/></svg>',
                    text: '거짓말을 할수록 코의 초록색 아스파라거스가 끝없이 쑥쑥! 피노키오처럼 무시무시하게 자라났꼬비! 💦' 
                },
                { 
                    num: 4, 
                    image: 'images/baekkobi_asparagus.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><rect width="100%" height="100%" fill="#ffebee"/><ellipse cx="100" cy="200" rx="70" ry="25" fill="#5d4037"/><path d="M30,200 L170,200" stroke="#d32f2f" stroke-width="5"/><circle cx="70" cy="180" r="8" fill="#4caf50"/><circle cx="110" cy="185" r="6" fill="#81c784"/></svg>',
                    text: '결국 아삭하게 코를 뚝 떼어 멜로니와 스테이크 팬에 구워 먹었꼬비! 너무 맛있어서 거짓말은 잊었꼬비~ 🥩😋' 
                }
            ]
        },
        'siraegi': {
            title: '양구 펀치볼 시래기',
            tag: '건조/가공',
            season: '12월 ~ 2월',
            image: 'images/yanggu_siraegi.png',
            desc: '해발 1,100m의 펀치볼 분지 청정지역에서 건조되는 시래기입니다. 시래기 전용 무청만을 사용하여 타지역 시래기보다 훨씬 부드럽고 영양이 풍부한 명품 시래기입니다.',
            purchase_season: '12월 ~ 2월 (겨울 건조 후 연중 구매 가능)',
            target_age: '40대 ~ 70대 (구수하고 정겨운 한식을 좋아하는 세대)',
            mascot_image: 'images/baekkobi_siraegi.png',
            baekkobi_tip: '펀치볼 시래기는 껍질이 얇아 삶기만 해도 마법처럼 부드럽꼬비! 구수한 시래기국을 추천하꼬비!',
            efficacy: '변비 및 대장암 예방(식이섬유 풍부), 뼈 건강(칼슘 풍부)',
            storage: '푹 삶아서 소분한 후 물을 살짝 넣어 냉동 보관해야 질겨지지 않습니다.',
            dishes: '시래기 된장국, 시래기 밥, 고등어 시래기 조림, 시래기 나물볶음',
            comic_steps: [
                { 
                    num: 1, 
                    image: 'images/baekkobi_siraegi.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><rect width="100%" height="100%" fill="#eceff1"/><path d="M-10,180 Q30,120 100,170 T210,150 L210,260 L-10,260 Z" fill="#b0bec5"/><path d="M-10,210 Q60,180 130,220 T210,190 L210,260 L-10,260 Z" fill="#cfd8dc"/><circle cx="30" cy="50" r="3" fill="#fff"/><circle cx="170" cy="80" r="4" fill="#fff"/></svg>',
                    text: '해발 1,100m 펀치볼 분지에 엄청난 눈보라가 치기 시작했꼬비! 배꼬비와 시래기친구 시리는 덜덜덜! ❄️' 
                },
                { 
                    num: 2, 
                    image: 'images/baekkobi_siraegi.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><rect width="100%" height="100%" fill="#d7ccc8"/><line x1="20" y1="40" x2="180" y2="40" stroke="#5d4037" stroke-width="4"/><line x1="30" y1="40" x2="30" y2="240" stroke="#5d4037" stroke-width="4"/><line x1="170" y1="40" x2="170" y2="240" stroke="#5d4037" stroke-width="4"/><path d="M40,40 C40,80 50,90 45,130" stroke="#8d6e63" stroke-width="3" fill="none"/><path d="M80,40 C85,75 80,95 85,120" stroke="#8d6e63" stroke-width="3" fill="none"/></svg>',
                    text: '"이 매서운 바람을 견뎌야만 부드러운 시래기가 될 수 있꼬비!" 시리는 빨간 목도리를 두르고 나무 덕장을 지켰꼬비! 🧣' 
                },
                { 
                    num: 3, 
                    image: 'images/baekkobi_siraegi.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><defs><radialGradient id="sunLight" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fff9c4"/><stop offset="100%" stop-color="#ffe082"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#sunLight)"/><circle cx="100" cy="120" r="60" fill="#fff" opacity="0.3"/><polygon points="100,120 0,0 20,0" fill="#ffb74d" opacity="0.4"/><polygon points="100,120 180,0 200,0" fill="#ffb74d" opacity="0.4"/></svg>',
                    text: '얼었다 녹았다를 백 번 반복하며, 햇살을 듬뿍 받아 드디어 영양도 가득하고 부드러운 시래기 완성! 🌾' 
                },
                { 
                    num: 4, 
                    image: 'images/baekkobi_siraegi.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><rect width="100%" height="100%" fill="#fbe9e7"/><ellipse cx="100" cy="210" rx="60" ry="20" fill="#4e342e"/><path d="M90,170 Q95,140 100,170 T110,170" stroke="#fff" stroke-width="3" fill="none" opacity="0.7"/><circle cx="75" cy="205" r="5" fill="#8d6e63"/></svg>',
                    text: '보글보글 끓여 낸 구수한 시래기 된장국 한 그릇! 추위에 떨던 배꼬비와 시리의 온몸이 사르르 녹꼬비~ 🥰🍲' 
                }
            ]
        },
        'melon': {
            title: '양구 멜론',
            tag: '명품과일',
            season: '8월 ~ 9월',
            image: 'images/yanggu_melon.png',
            desc: '밤낮의 큰 일교차로 당도가 15브릭스 이상으로 매우 높고 과육이 단단합니다. 전국탑과채 품질평가회에서 2년 연속 대상을 수상할 정도로 최고 품질을 자랑합니다.',
            purchase_season: '8월 ~ 9월 (늦여름 한정 수확)',
            target_age: '10대 ~ 40대 (달콤한 디저트 및 선물용 과일을 즐기는 가족/젊은 층)',
            mascot_image: 'images/baekkobi_melon.png',
            baekkobi_tip: '상온에서 후숙 후 냉장고에 넣어 차갑게 드시면 당도가 폭발하꼬비! 촘촘한 네트를 고르꼬비!',
            efficacy: '면역력 향상(베타카로틴 풍부), 체내 나트륨 배출(칼륨 풍부)',
            storage: '서늘한 실온에 후숙 보관하며, 자른 후에는 랩으로 밀봉하여 냉장 보관합니다.',
            dishes: '멜론 생과일 디저트, 프로슈토 멜론, 멜론 빙수',
            comic_steps: [
                { 
                    num: 1, 
                    image: 'images/baekkobi_melon.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><defs><linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a5d6a7"/><stop offset="100%" stop-color="#c8e6c9"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#heroGrad)"/><path d="M0,0 L200,250 M200,0 L0,250" stroke="#81c784" stroke-width="1.5" stroke-dasharray="5 5"/></svg>',
                    text: '그물망 멜론 껍질 헬멧을 쓴 정의로운 멜론 히어로 배꼬비 전사가 마을에 우뚝 섰꼬비! 멜론 빔! ⚔️' 
                },
                { 
                    num: 2, 
                    image: 'images/baekkobi_melon.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><rect width="100%" height="100%" fill="#ede7f6"/><circle cx="50" cy="180" r="30" fill="#b39ddb" opacity="0.4"/><circle cx="150" cy="180" r="25" fill="#b39ddb" opacity="0.4"/></svg>',
                    text: '앗! 더운 여름철 기운이 다 빠져 길바닥에 지쳐 칭얼거리는 아리와 시리 발견! "달달함 충전이 시급하꼬비!" 🥱' 
                },
                { 
                    num: 3, 
                    image: 'images/baekkobi_melon.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><rect width="100%" height="100%" fill="#e8f8f5"/><polygon points="100,125 -50,-50 250,-50" fill="#a3e4d7" opacity="0.6"/><circle cx="100" cy="125" r="30" fill="#1abc9c" opacity="0.8"/><text x="100" y="132" font-size="20" font-weight="900" fill="#fff" text-anchor="middle" font-family="sans-serif">15˚Bx</text></svg>',
                    text: '"받아랏! 당도 15브릭스 이상의 초강력 에너지 멜론 파워 빔!" 연두빛 달콤한 파장을 뿜어냈꼬비! 🍈⚡' 
                },
                { 
                    num: 4, 
                    image: 'images/baekkobi_melon.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><rect width="100%" height="100%" fill="#fce4ec"/><path d="M30,60 Q40,40 50,60 T70,60 Q80,80 50,110 Q20,80 30,60 Z" fill="#f8bbd0" opacity="0.6" transform="scale(0.6) translate(40, 40)"/></svg>',
                    text: '멜론 한 조각을 먹고 모두 눈이 번쩍! 해피 하트 뿜어내며 멜론 전사와 신나게 춤을 췄꼬비! 🍈💛' 
                }
            ]
        },
        'apple': {
            title: '양구 사과',
            tag: '명품과일',
            season: '9월 ~ 11월',
            image: 'images/yanggu_apple.png',
            desc: '밤낮의 큰 일교차와 풍부한 일조량을 받아 단단하고 아삭한 과육과 풍부한 과즙을 자랑합니다. 기후 변화로 인해 양구가 한반도 대표 사과 산지로 자리매김했습니다.',
            purchase_season: '9월 ~ 11월 (가을 수확기 및 저온 보관 상시 판매)',
            target_age: '전 연령대 (남녀노소 누구나 매일 신선하게 즐길 수 있는 국민 과일)',
            mascot_image: 'images/baekkobi_apple.png',
            baekkobi_tip: '껍질째 아삭아삭 베어 물면 달콤한 꿀즙이 팡 터진꼬비! 매일 아침 사과 한 알로 시작해 보꼬비!',
            efficacy: '비타민 C 공급(피로 회복), 펙틴 식이섬유(장 건강 및 변비 개선)',
            storage: '에틸렌 가스가 나오므로 비닐이나 랩으로 개별 밀봉하여 따로 보관합니다.',
            dishes: '생사과 슬라이스, 수제 사과잼, 애플파이, 사과 샐러드',
            comic_steps: [
                { 
                    num: 1, 
                    image: 'images/baekkobi_apple.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><defs><linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#311b92"/><stop offset="100%" stop-color="#7986cb"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#sleepGrad)"/><text x="150" y="60" font-size="20" font-weight="700" fill="#fff" opacity="0.5" font-family="sans-serif">Z</text></svg>',
                    text: '월요일 아침, 침대에서 비몽사몽 일어나기 힘들어 눈을 못 뜨고 있는 아기 배꼬비... 🥱' 
                },
                { 
                    num: 2, 
                    image: 'images/baekkobi_apple.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><rect width="100%" height="100%" fill="#e8f5e9"/><path d="M10,0 Q100,90 200,0" fill="#a5d6a7"/><circle cx="50" cy="40" r="10" fill="#e53935"/><circle cx="150" cy="30" r="12" fill="#e53935"/></svg>',
                    text: '사과친구 아리가 갓 수확한 단단하고 붉은빛이 영롱한 사과를 들고 방에 찾아왔꼬비! 🍎' 
                },
                { 
                    num: 3, 
                    image: 'images/baekkobi_apple.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><rect width="100%" height="100%" fill="#fffde7"/><circle cx="100" cy="120" r="45" fill="#fff59d" opacity="0.6"/><circle cx="60" cy="90" r="6" fill="#fbc02d"/><circle cx="140" cy="90" r="8" fill="#fbc02d"/></svg>',
                    text: '와그작! 껍질째 사과를 베어 물자 입안에서 상큼한 꿀과즙 분수가 팡팡 터져버렸꼬비! 💦' 
                },
                { 
                    num: 4, 
                    image: 'images/baekkobi_apple.png', 
                    bg_svg: '<svg class="comic-bg" viewBox="0 0 200 250" preserveAspectRatio="none"><defs><linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ff7043"/><stop offset="100%" stop-color="#ffb74d"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#sunGrad)"/><circle cx="100" cy="120" r="30" fill="#ffeb3b"/></svg>',
                    text: '비타민 충전 완료! 에너지가 번쩍 솟아나 침대를 박차고 아리와 힘차게 하루를 시작해 보꼬비! 🍎✨' 
                }
            ]
        }
    };

    // --- Food Filter Logic ---
    const foodTabBtns = document.querySelectorAll('.food-tab-btn');
    const foodCards = document.querySelectorAll('.food-card');

    if (foodTabBtns.length > 0) {
        foodTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Active tab class toggle
                foodTabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.dataset.filter;

                foodCards.forEach(card => {
                    if (filterValue === 'all' || card.dataset.category === filterValue) {
                        card.classList.remove('hidden');
                        card.style.animation = 'none';
                        void card.offsetWidth; // Reflow trigger
                        card.style.animation = 'fadeInCard 0.5s ease forwards';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // --- Food Detail Modal Logic ---
    const foodDetailModal = document.getElementById('food-detail-modal');
    const foodDetailCloseBtn = document.getElementById('food-detail-close-btn');
    const btnFoodModals = document.querySelectorAll('.btn-food-modal');

    const foodModalImg = document.getElementById('food-modal-img');
    const foodModalTagText = document.getElementById('food-modal-tag-text');
    const foodModalSeasonText = document.getElementById('food-modal-season-text');
    const foodModalTitle = document.getElementById('food-modal-title');
    const foodModalDesc = document.getElementById('food-modal-desc');
    const foodModalDetails = document.getElementById('food-modal-details');
    const foodModalMascotImg = document.getElementById('food-modal-mascot-img');
    const foodModalMascotTip = document.getElementById('food-modal-mascot-tip');
    const foodModalComicGrid = document.getElementById('food-modal-comic-grid');

    if (btnFoodModals.length > 0 && foodDetailModal) {
        btnFoodModals.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent trigger click effect of "-10 years"
                const id = btn.getAttribute('data-id');
                const data = foodData[id];

                if (data) {
                    foodModalImg.src = data.image;
                    foodModalTagText.innerText = data.tag;
                    foodModalSeasonText.innerText = `제철: ${data.season}`;
                    foodModalTitle.innerText = data.title;
                    foodModalDesc.innerText = data.desc;

                    // Bind Mascot info
                    if (foodModalMascotImg && data.mascot_image) {
                        foodModalMascotImg.src = data.mascot_image;
                    }
                    if (foodModalMascotTip && data.baekkobi_tip) {
                        foodModalMascotTip.innerText = data.baekkobi_tip;
                    }

                    // Dynamically build metadata table
                    foodModalDetails.innerHTML = `
                        <div class="food-modal-details-list">
                            <div class="food-modal-detail-item">
                                <span class="food-modal-detail-label"><i class="fas fa-heartbeat"></i> 주요효능</span>
                                <span class="food-modal-detail-val">${data.efficacy}</span>
                            </div>
                            <div class="food-modal-detail-item">
                                <span class="food-modal-detail-label"><i class="far fa-calendar-alt"></i> 구입시기</span>
                                <span class="food-modal-detail-val">${data.purchase_season}</span>
                            </div>
                            <div class="food-modal-detail-item">
                                <span class="food-modal-detail-label"><i class="fas fa-users"></i> 선호연령</span>
                                <span class="food-modal-detail-val">${data.target_age}</span>
                            </div>
                            <div class="food-modal-detail-item">
                                <span class="food-modal-detail-label"><i class="fas fa-box-open"></i> 보관방법</span>
                                <span class="food-modal-detail-val">${data.storage}</span>
                            </div>
                            <div class="food-modal-detail-item">
                                <span class="food-modal-detail-label"><i class="fas fa-utensils"></i> 대표요리</span>
                                <span class="food-modal-detail-val">${data.dishes}</span>
                            </div>
                        </div>
                    `;

                    // Reset Tabs to Details Info Default
                    const tabButtons = foodDetailModal.querySelectorAll('.food-modal-tab-btn');
                    const infoContent = foodDetailModal.querySelector('.food-modal-info-content');
                    const comicContent = foodDetailModal.querySelector('.food-modal-comic-content');

                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    const defaultTabBtn = foodDetailModal.querySelector('[data-tab="info"]');
                    if (defaultTabBtn) defaultTabBtn.classList.add('active');
                    if (infoContent) infoContent.classList.add('active');
                    if (comicContent) comicContent.classList.remove('active');

                    // Bind click switching listener to tabs
                    tabButtons.forEach(tabBtn => {
                        tabBtn.onclick = (event) => {
                            event.preventDefault();
                            tabButtons.forEach(tb => tb.classList.remove('active'));
                            tabBtn.classList.add('active');

                            const selectedTab = tabBtn.getAttribute('data-tab');
                            if (selectedTab === 'info') {
                                if (infoContent) infoContent.classList.add('active');
                                if (comicContent) comicContent.classList.remove('active');
                            } else {
                                if (infoContent) infoContent.classList.remove('active');
                                if (comicContent) comicContent.classList.add('active');
                            }
                        };
                    });

                    // Dynamically render comic grid
                    if (foodModalComicGrid && data.comic_steps) {
                        foodModalComicGrid.innerHTML = data.comic_steps.map(step => `
                            <div class="comic-cut">
                                ${step.bg_svg || ''}
                                <span class="cut-number">${step.num}</span>
                                <div class="comic-cut-img-wrap">
                                    <img src="${step.image}" alt="배꼬비 웹툰 컷 ${step.num}" class="comic-cut-img">
                                </div>
                                <div class="comic-bubble">${step.text}</div>
                            </div>
                        `).join('');
                    }

                    foodDetailModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }

    const closeFoodDetailModal = () => {
        if (foodDetailModal) {
            foodDetailModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (foodDetailCloseBtn) {
        foodDetailCloseBtn.addEventListener('click', closeFoodDetailModal);
    }

    const foodDetailCloseBtnBottom = document.getElementById('food-detail-close-btn-bottom');
    if (foodDetailCloseBtnBottom) {
        foodDetailCloseBtnBottom.addEventListener('click', closeFoodDetailModal);
    }
    if (foodDetailModal) {
        foodDetailModal.addEventListener('click', (e) => {
            if (e.target === foodDetailModal) {
                closeFoodDetailModal();
            }
        });
    }

    // --- Custom Toast Notification Helper ---
    const showToast = (title, message, type = 'success') => {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast-message ${type}`;

        const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        
        toast.innerHTML = `
            <div class="toast-icon"><i class="fas ${iconClass}"></i></div>
            <div class="toast-content">
                <h5>${title}</h5>
                <p>${message}</p>
            </div>
        `;

        container.appendChild(toast);

        // Auto remove after 4 seconds
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 4000);
    };

    // --- EmailJS Form Submission ---
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit-btn');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Set sending state
            submitBtn.disabled = true;
            submitBtn.classList.add('sending');
            const submitBtnSpan = submitBtn.querySelector('span');
            const originalText = submitBtnSpan.textContent;
            submitBtnSpan.textContent = '전송 중...';

            const templateParams = {
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-email').value,
                title: document.getElementById('contact-title').value,
                message: document.getElementById('contact-message').value,
                time: new Date().toLocaleString('ko-KR')
            };

            emailjs.send('service_bmacaox', 'template_7sd1fhr', templateParams)
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    showToast('전송 성공 🎉', '문의가 성공적으로 전달되었습니다! 기재하신 이메일로 빠르게 답변 드리겠습니다.', 'success');
                    contactForm.reset();
                }, (error) => {
                    console.log('FAILED...', error);
                    showToast('전송 실패 😢', '이메일 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.', 'error');
                })
                .finally(() => {
                    // Restore button state
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('sending');
                    submitBtnSpan.textContent = originalText;
                });
        });
    }

});

