var oriId;

var popupTitle;
var popupInputId;
var popupInputName;
var popupInputAge;
var popupSelectSex;
var popupInputBirth;
var popupInputAddress;
var popupInputPhone;
var popupInputEmail;

var message;

function rememberMe(username) {
    if (document.getElementById("keep").checked) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = "username=" + username + ";expires=" + exp.toGMTString();
    } else {
        document.cookie = "username=" + username + ";expires=-1";
    }
}

function login() {
    var username = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;
    var userExist;
    var loginSuccess = false;
    if (username != "admin") {
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4) {
                if (httpRequest.responseText == "true") {
                    rememberMe(username);
                    closePopup();
                    window.location.reload();
                } else {
                    message.info("登录失败，用户名或密码错误");
                    return;
                }
            }
        }
        window.location.href = "check?id=" + username;
        return;
    } else if (username == "admin" && password == "admin") {
        rememberMe(username);
        closePopup();
        window.location.reload();
    } else {
        message.info("登录失败，用户名或密码错误");
    }
}

/* 构造函数 */
function Message() { }
/* 用于移除message */
Message.id = 0;

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

window.onload = function() {
    popupTitle = document.getElementById("title");
    popupInputId = document.getElementById("id");
    popupInputName = document.getElementById("name");
    popupInputAge = document.getElementById("age");
    popupSelectSex = document.getElementById("sex");
    popupInputBirth = document.getElementById("birth");
    popupInputAddress = document.getElementById("address");
    popupInputPhone = document.getElementById("phone");
    popupInputEmail = document.getElementById("email");
    var username = getCookie("username");
    document.getElementById("username").innerText = username;
    if (username == "admin") {
        document.getElementById("selectLi").style.display = "";
        document.getElementById("addLi").style.display = "";
        document.getElementById("importLi").style.display = "";
        document.getElementById("modifyLi").style.display = "";
        document.getElementById("deleteLi").style.display = "";
    } else if (username == "") {
        window.location.href = "#loginPopup";
    }

    /**
     * 创建全局提示
     * @param {string} content 提示内容
     * @param {number} duration 持续时间
     * @param {string} type 提示类型
     */
    Message.prototype.create = function (content, duration, type) {
        // svg太长，此处省略
        const icon = {
            success: '<svg class="icon success"></svg>',
            error: '<svg class="icon error"></svg>',
            info: '<svg class="icon info" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" fill="#1890ff"></path><path d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm32 588c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" fill="#e6f7ff"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" fill="#1890ff"></path></svg>',
            warning: '<svg class="icon warning"></svg>',
            loading: '<svg class="icon loading"></svg>'
        }
        const html = `
            <li class="message-item fade-in" data-id="${Message.id}">
                <div>
                    ${icon[type]}
                    <span>${content}</span>
                </div>
            </li>`;
        document.getElementById("messageList").insertAdjacentHTML('beforeend', html);
        Message.id++;
        const lis = document.querySelectorAll('li.message-item');
        const length = lis.length;
        const lastLi = lis[length - 1];
        // 延时移除
        lastLi._timeout = setTimeout(function () {
            lastLi.classList.remove('fade-in');
            lastLi.classList.add('fade-out');
            lastLi.addEventListener('animationend', function (e) {
                this.remove();
            });
        }, duration);
        // 最多显示7条
        if (length > 7) {
            clearTimeout(lis[0]._timeout);
            lis[0].remove();
        }
    }
    Message.prototype.success = function (content, duration = 3000) {
        this.create(content, duration, 'success');
        return Message.id;
    }
    Message.prototype.error = function (content, duration = 3000) {
        this.create(content, duration, 'error');
        return Message.id;
    }
    Message.prototype.warning = function (content, duration = 3000) {
        this.create(content, duration, 'warning');
        return Message.id;
    }
    Message.prototype.info = function (content, duration = 3000) {
        this.create(content, duration, 'info');
        return Message.id;
    }
    Message.prototype.loading = function (content, duration = 3000) {
        this.create(content, duration, 'loading');
        return Message.id;
    }
    Message.prototype.remove = function (id) {
        const li = document.querySelector(`li.message-item[data-id="${id}"]`);
        clearTimeout(li._timeout);
        li.remove();
    }

    message = new Message();
}

function logout() {
    document.cookie = "username=;expires=-1";
    window.location.reload();
}

function sortSelectChanged() {
    const sortSelect = document.getElementById("sortSelect");
    window.location.href = "sort?type=" + sortSelect.value;
}

function selectAll() {
    var el = document.getElementById("students-table").getElementsByTagName("input");
    for (var i = 0; i < el.length; i++) {
        if(el[i].type == 'checkbox') {
            el[i].checked = !el[i].checked;
        }
    }
}

function deleteStudents() {
    var id = "";
    var el = document.getElementById("students-table").getElementsByTagName("input");
    var counts = 0;
    for(var i = 0; i < el.length; i++){
        if (el[i].type == 'checkbox' && el[i].checked) {
            counts++;
        }
    }
    if(counts == 0){
        message.info("您未选择任何内容");
    } else {
        for (var i = 0; i < el.length; i++) {
            if(el[i].type == 'checkbox' && el[i].checked) {
                id += el[i].parentElement.parentElement.childNodes[3].innerText + ",";
            }
        }
        message.info("正在删除...");
        window.location.href = "delete?id=" + id;
    }
}

function updateAge() {
    var birth = popupInputBirth.value;
    var birthYear = birth.substring(0, 4);
    var birthMonth = birth.substring(5, 7);
    var birthDay = birth.substring(8, 10);
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var ageYear = nowYear - birthYear;
    var ageMonth = nowMonth - birthMonth;
    var ageDay = now.getDate() - birthDay;
    if(ageMonth < 0){
        ageYear--;
        ageMonth = 12 + ageMonth;
    }
    if(ageDay < 0){
        ageMonth--;
        ageDay = 31 + ageDay;
    }
    popupInputAge.value = ageYear;
}

function submitStudent() {
    var id = popupInputId.value;
    var name = popupInputName.value;
    var age = popupInputAge.value;
    var sex = popupSelectSex.options[popupSelectSex.selectedIndex].text;
    var birth = popupInputBirth.value;
    var address = popupInputAddress.value;
    var phone = popupInputPhone.value;
    var email = popupInputEmail.value;
    var el = document.getElementById("students-table").getElementsByTagName("input");
    if (!popupInputId.disabled) {
        for(var i = 0 ; i < el.length; i++){
            if(el[i].type == 'checkbox'){
                var number = el[i].parentElement.parentElement.childNodes[3].innerText;//学号
                if(number == id){
                    message.info("已存在学号为 " + id + " 的学生信息");
                    return;
                }
            }
        }
    }
    if(id == "" || name == "" || age == "" || popupSelectSex.selectedIndex == 0 || birth == "" || address == "" || phone == "" || email == "") {
        message.info("请填写完整");
    } else {
        var submitType = popupInputId.disabled ? "modify" : "add";
        window.location.href = submitType + "?id=" + id + ",&name=" + name + ",&age=" + age + ",&sex=" + sex + ",&birth=" + birth + ",&address=" + address + ",&phone=" + phone + ",&email=" + email + ",";
        message.info("正在执行操作");
    }
}

// 读取本地 Excel 文件
function readWorkbookFromLocalFile(file, callback) {
	var reader = new FileReader();
	reader.onload = function(e) {
		var data = e.target.result;
		var workbook = XLSX.read(data, {type: 'binary'});
		if(callback) callback(workbook);
	};
	reader.readAsBinaryString(file);
}

function importStudents() {
    var inputObj = document.createElement('input')
    inputObj.setAttribute('id', 'file');
    inputObj.setAttribute('type', 'file');
    inputObj.setAttribute('name', 'file');
    inputObj.setAttribute("style", 'visibility: hidden');
    document.body.appendChild(inputObj);
    inputObj.value;
    inputObj.click();
    document.querySelector('#file').addEventListener('change', e => {
        for (let entry of e.target.files) {
            if (entry.name.endsWith('.xlsx') || entry.name.endsWith('.xls')) {
                readWorkbookFromLocalFile(entry, function(workbook) {
                    var sheet = workbook.Sheets[workbook.SheetNames[0]];
                    var data = XLSX.utils.sheet_to_json(sheet);
                    var ids = "";
                    var names = "";
                    var ages = "";
                    var sexes = "";
                    var births = "";
                    var addresses = "";
                    var phones = "";
                    var emails = "";
                    data.forEach(function(item) {
                        ids += item.学号 + ",";
                        names += item.姓名 + ",";
                        ages += item.年龄 + ",";
                        sexes += item.性别 + ",";
                        births += item.生日 + ",";
                        addresses += item.住址 + ",";
                        phones += item.电话 + ",";
                        emails += item.邮箱 + ",";
                    });
                    window.location.href = "add?id=" + ids + "&name=" + names + "&age=" + ages + "&sex=" + sexes + "&birth=" + births + "&address=" + addresses + "&phone=" + phones + "&email=" + emails;
                    message.info("正在导入，请耐心等待...");
                });
            } else {
                message.info("请选择正确的文件，导入文件仅支持 xlsx 或 xls 格式");
            }
        }
    });
    inputObj.remove();
}

function findStudent() {
    var key = document.getElementById("findInput").value;
    if(key == ""){
        message.info("请输入学号或姓名");
    } else{
        window.location.href = "./get?key=" + key;
    }
}

function addStudent() {
    popupTitle.innerText = "添加学生信息";
    popupInputId.disabled = false;
    window.location.href = "#studentPopup";
}

function modifyStudentPopup() {
    popupTitle.innerText = "修改学生信息";
    popupInputId.disabled = true;
    var el = document.getElementById("students-table").getElementsByTagName("input");
    var counts = 0;
    for(var i = 0; i < el.length; i++) {
        if(el[i].type == 'checkbox' && el[i].checked) {
            oriId = el[i].parentElement.parentElement.childNodes[3].innerText;//学号
            popupInputId.value = oriId;
            popupInputName.value = el[i].parentElement.parentElement.childNodes[5].innerText;
            popupInputAge.value = el[i].parentElement.parentElement.childNodes[7].innerText;
            popupSelectSex.selectedIndex = el[i].parentElement.parentElement.childNodes[9].innerText == "男" ? 1 : 2;
            popupInputBirth.value = el[i].parentElement.parentElement.childNodes[11].innerText;
            popupInputAddress.value = el[i].parentElement.parentElement.childNodes[13].innerText;
            popupInputPhone.value = el[i].parentElement.parentElement.childNodes[15].innerText;
            popupInputEmail.value = el[i].parentElement.parentElement.childNodes[17].innerText;
            counts++;
        }
    }
    if (counts == 0) {
        message.info("您未选择任何内容");
    } else if (counts == 1) {
        window.location.href = "#studentPopup";
    } else {
        message.info("不可多选");
    }
}

function closePopup() {
    window.location.href = "#";
}