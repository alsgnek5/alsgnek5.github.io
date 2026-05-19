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

});
