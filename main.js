window.onload=function(){
    
    var questions = [
        {
            "question": "笑氣在常溫常壓下為無色無味的氣體?",
            options: ["是", "否"],
            answer: "1",
        },{
            "question": "笑氣是毒品的一種?",
            options: ["是", "否"],
            answer: "1",
        },{
            "question": "KTV若有人吸食笑氣，業者無主動通報並未觸法?",
            options: ["是", "否"],
            answer: "1",
        },{
            "question": "笑氣可以用於食品添加物中?",
            options: ["是", "否"],
            answer: "0",
        },{
            "question": "有取得核可文件就可以使用笑氣?",
            options: ["是", "否"],
            answer: "0",
        },{
            "question": "施用後會使人在短時間內感到放鬆及愉悅感，且目前未列入毒品防害防制法的毒品分類中，請問是哪種濫用藥物?",
            options: ["大麻", "笑氣", "古柯鹼"],
            answer: "1",
        },{
            "question": "笑氣為一種無色有甜味的氣體，何者不是它的正當用途?",
            options: ["供人吸食", "食品加工", "醫療用麻醉劑"],
            answer: "0",
        },{
            "question": "吸食笑氣候會產生以下何種情形?",
            options: ["嗜睡", "變美麗", "不自覺想笑"],
            answer: "2",
        },{
            "question": "吸食笑氣被抓到將會依照______法進行法辦?",
            options: ["毒品妨害防制條例第4條", "社會秩序維護法第66條", "菸害防制法"],
            answer: "1",
        },{
            "question": "面對有人向你提供毒品時，何種方式來回應不恰當?",
            options: ["自我解諷法", "友誼勸服法", "屈就對方選擇答應"],
            answer: "2",
        },
    ]

    var socre = 0;
    var answer = [];
    var question_index = 0;
    var question = document.getElementsByClassName("question_title")[0];

    var optionz = document.getElementById("options");
    var options = document.getElementsByName("option");

    var time = document.getElementById("time");
    var wrap = document.getElementsByClassName("wrap")[0];
    var buttons = document.getElementsByTagName("Button");
    var body = document.getElementsByTagName("Body")[0];
    
    init();

    var count = 600;
    var timer = setInterval(function () {
        if (count > 0) {
            count = count - 1;

            if (count > 60 ) {
                var minutes = parseInt(count / 60);
                var second = count % 60;
                time.innerHTML = minutes + "分" + second + "秒";
            }else {
                time.innerHTML = count + "秒";
                console.log(count + "秒");
            }
        }
        else {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
    
    function init() {
        question.children[0].innerHTML = questions[question_index].question;

        while (optionz.hasChildNodes()) {  
            optionz.removeChild(optionz.firstChild);
        }

        questions[question_index].options.forEach((element, index) => {
            var temp_option = document.createElement('button');
            temp_option.name = "option";
            temp_option.id = index;
            temp_option.innerHTML = element;
            temp_option.className = "balloon";

            optionz.appendChild(temp_option);
        });
        
        options.forEach(element => {
            element.addEventListener("click", nextQuestion);
        });
    }

    function nextQuestion(e) {
        if (e.target.id !== questions[question_index].answer) {
            console.log(window.matchMedia("(max-width: 786px)").matches);
            if (window.matchMedia("(max-width: 786px)").matches) {
                e.target.style.backgroundColor = "#ff0000";
                document.getElementById(questions[question_index].answer).style.backgroundColor = "#00ff00";
            }
            answer.push({question_index: e.target.id});
        }else {
            socre += 10;
            if (window.matchMedia("(max-width: 786px)").matches) {
                e.target.style.backgroundColor = "#00ff00"
            }
            answer.push({question_index: e.target.id});
        }

        options.forEach(element => {
            element.disabled = true;
        });

        window.setTimeout(function() {
            options.forEach(element => {
                if (window.matchMedia("(max-width: 786px)").matches) {
                    element.style.backgroundColor = "#364cca";
                }
                element.disabled = false;
            });

            question_index++;
                
            if (question_index == questions.length) {
                endGame();
                return;
            }
    
            document.title= "關卡" + (parseInt(question_index) + 1);

            while (optionz.hasChildNodes()) {  
                optionz.removeChild(optionz.firstChild);
            }

            question.children[0].innerHTML = questions[question_index].question;
    
            questions[question_index].options.forEach((element, index) => {
                var temp_option = document.createElement('button');
                temp_option.name = "option";
                temp_option.id = index;
                temp_option.innerHTML = element;
                temp_option.className = "balloon";
    
                optionz.appendChild(temp_option);
            });
            
            options.forEach(element => {
                element.addEventListener("click", nextQuestion);
            });

        }, 1500);
    }

    function endGame() {

        body.innerHTML = '<div class="blns"><div class="bln-1"></div></div>';
        
        blowUpBalloons();

        window.setTimeout(function() {

            body.innerHTML = '<div class="container"><div class="wrap"></div></div>';

            wrap = document.getElementsByClassName("wrap")[0];

            wrap.style.width = "auto";
            wrap.style.height = "100%";

            wrap.innerHTML = '<div class="tittle"><h1>遊戲結束</h1><h2>分數: '+ socre + '</h2></div><div class="questions"></div><div class="button"><button id="bt" onclick="window.location.href=&apos;/index.html&apos;">回首頁</button></div>';
        
            document.title = "遊戲結束";

            buttons = Array.prototype.slice.call(buttons)
            buttons = [].slice.call(buttons);

            buttons.forEach(element => {
                element.style.width = "100%";
            });

            var questions_ele = document.getElementsByClassName("questions")[0];

            answer.forEach((element, index) => {
                questions_ele.innerHTML += '<div class="question" id="' + index + '"><p>第'+ (parseInt(index) + 1) +'題: ' + questions[index].question + '</p><p>你的答案: '+ questions[index].options[element.question_index] +'</p><p>正確答案: '+ questions[index].options[questions[index].answer] +'</p></div>';
            });

        }, 4200);
    }

    var windowWidth = $(window).outerWidth();
    var windowHeight = $(window).outerHeight();

    function pickANumber(max, min) {
      return Math.random() * (max - min + min) + min;
    }

    function changeColors(el) {
      el.removeClass();
      var random = Math.floor(pickANumber(5,1));
      el.addClass('bln-'+random+'-clone');
    }

    function resetBalloon(el) {
      changeColors(el);

      var scale = (pickANumber(0.9,0.5)).toFixed(1);
      el.css('transform', 'scale(' + scale + ')');

      var x = Math.floor(Math.random() * windowWidth);
      el.css('left', x);
      var y = Math.floor(Math.random() * 300 + windowHeight);
      el.css('top', y);
      releaseBalloon(el);
    }

    function releaseBalloon(el) {
      var maxbllnSpeed = Math.floor(Math.random() * 10000 + 300);
      var wind = Math.floor(Math.random() * - 30);
      var rotate = Math.floor(Math.random() * 560) + 100;  


      el.animate(
        { 
          top: '-150px',
          left: '+=' + wind + 0,
        }, {
        step: function() {
          el.css({
            transform: 'rotate('+rotate+'deg)',
            transition: 'transform '+ maxbllnSpeed * .001  +'s linear'
          });
        },
        duration: maxbllnSpeed,
        easing: 'linear',
        complete: function() {
          resetBalloon(el);
        }
      });

    }

    function blowUpBalloons() {
      for (i = 0; i < 200; i++) {
        var el = $('.bln-1').clone();
        el.appendTo('.blns');

        resetBalloon(el);

        var position = el.position();

        if (position.top > windowHeight || position.left > windowWidth || position.left < -100) {
          resetBalloon(el);
        } else {
          //releaseBalloon(el);
        }

      }
    }
}