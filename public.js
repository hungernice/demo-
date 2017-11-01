var _jM = new jModule();

function jModule() {};

jModule.prototype.validate = {
	// 是否是有效的手机号
	isMobile : function(v) {
		v = $.trim(v);
		return v.match(/^1[34578][0-9]\d{8}$/);
	},
	// 是否是空字符串或者null
	isEmpty : function(v) {
		v = $.trim(v);
		return v == null || v == "" || v.length <= 0;
	},
	// 是否不为空字符串
	isNotEmpty : function(v) {
		v = $.trim(v);
		return v != null && v != "" && v.length > 0;
	},
	// 是否是有效的数字，包括整数与小数
	isNumber : function(v) {
		v = $.trim(v);
		return !isNaN(v);
	},
	// 是否是整数
	isInteger : function(v) {
		v = $.trim(v);
		return v.match(/^[0-9]*$/)
	},
	// 是否是货币数字，小数点后两位
	isBigDecimal : function(v) {
		v = $.trim(v);
		if (isNaN(v)) {
			return false;
		}
		var index = v.lastIndexOf(".");
		if (index == -1) {
			return true;
		} else {
			return index >= v.length - 3;
		}
	},
	// 是否是有效的数字，且在指定的范围内
	isNumberRangeIn : function(v, min, max) {
		v = $.trim(v);
		if (isNaN(v)) {
			return false;
		}
		var v2 = parseFloat(v);
		if (v2 < min || v2 > max) {
			return false;
		}
		return true;
	},
	// 是否是货币数字，且在指定的范围内
	isDecimalRangeIn : function(v, min, max) {
		v = $.trim(v);
		if (_jM.validate.isBigDecimal(v)) {
			var v2 = parseFloat(v);
			return v2 >= min && v2 <= max;
		}
		return false;
	},
	// 是否全是字母
	isCharacter : function(v) {
		v = $.trim(v);
		return v.match(/^[A-Za-z]+$/);
	},
	// 是否全是数字
	isDigital : function(v) {
		v = $.trim(v);
		return v.match(/^[0-9]*$/);
	},
	// 密码校验
	isPass : function(password) {
		var Modes = 0;
		for (i = 0; i < password.length; i++) {
			Modes |= CharMode(password.charCodeAt(i));
		}
		return bitTotal(Modes);

		// CharMode函数
		function CharMode(iN) {
			if (iN >= 48 && iN <= 57)// 数字
				return 1;
			/*
			 * if (iN >= 65 && iN <= 90) //大写字母 return 2;
			 */
			if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90)) // 大小写
				return 2;
			else
				return 4; // 特殊字符
		}

		// bitTotal函数
		function bitTotal(num) {
			modes = 0;
			for (i = 0; i < 4; i++) {
				if (num & 1)
					modes++;
				num >>>= 1;
			}
			return modes;
		}
	},
	// 是否包含非法的字符
	isIllegalCharacter : function(v) {
		v = $.trim(v);
		return v.match(/^((?![！~@#￥%……&*]).)*$/);
	},
	// 字符串长度是否在有效的范围内
	isLengthBetween : function(v, min, max) {
		v = $.trim(v);
		return v != null && v.length >= min && v.length <= max;
	},
	// 邮箱格式
	isEmail : function(v) {
		v = $.trim(v);
		var regex = /^[A-Za-zd0-9]+([-_.][A-Za-zd0-9]+)*@([A-Za-zd0-9]+[-.])+(.{1,})+[A-Za-zd0-9]$/;
		return regex.test(v);
	}
};

/* 表单校验 */
jModule.prototype.vtInp = {
	/* 校验密码 */
	vtPass : function(id, errId) {
		var errId = errId || id + "Err";
		if (!_jM.validate.isNotEmpty($("#" + id).val())) {
			_jM.toolTip.show(errId, "请输入密码");
			return false;
		}
		if (!_jM.validate.isLengthBetween($("#" + id).val(), 6, 20)) {
			_jM.toolTip.show(errId, "密码长度6-20位");
			return false;
		}
		if (_jM.validate.isPass($("#" + id).val()) < 2) {
			_jM.toolTip.show(errId, "密码至少包含字母、数字、字符号中的两种");
			return false;
		}
		_jM.toolTip.hide(errId);
		return true;
	},
	/* 校验账号 */
	vtManagerUser : function(id) {
		var errId = errId || id + "Err";
		if (!_jM.validate.isNotEmpty($("#" + id).val())) {
			_jM.toolTip.show(errId, "请输入账号");
			return false;
		}
		if (!_jM.validate.isLengthBetween($("#" + id).val(), 3, 10)) {
			_jM.toolTip.show(errId, "账号长度3-10位");
			return false;
		}
		if (_jM.validate.isPass($("#" + id).val()) < 2) {
			_jM.toolTip.show(errId, "账号至少包含字母、数字、字符号中的两种");
			return false;
		}
		_jM.toolTip.hide(errId);
		return true;
	},
	/* 校验确认密码 */
	vtEnterPass : function(id, beforeId) {
		var errId = id + "Err";
		if (!_jM.validate.isNotEmpty($("#" + id).val())) {
			_jM.toolTip.show(errId, "请输入密码");
			return false;
		}
		if ($("#" + beforeId).val() != $("#" + id).val()) {
			_jM.toolTip.show(errId, "两次密码输入不一致，请重新输入");
			return false;
		}
		_jM.toolTip.hide(errId);
		return true;
	},
	/* 检验重置密码 */
	vtResetPass : function(id, beforeId) {
		var errId = id + "Err";
		if (!_jM.validate.isNotEmpty($("#" + id).val())) {
			_jM.toolTip.show(errId, "请输入密码");
			return false;
		}
		if ($("#" + beforeId).val() == $("#" + id).val()) {
			_jM.toolTip.show(errId, "新旧密码输入一致，请重新输入");
			return false;
		}
		_jM.toolTip.hide(errId);
		return true;
	},
	/* 检验空 */
	vtNotEmpty : function(id, txt) {
		var errId = id + "Err";
		if (!_jM.validate.isNotEmpty($("#" + id).val())) {
			_jM.toolTip.show(errId, txt);
			return false;
		}
		_jM.toolTip.hide(errId);
		return true;
	},
	/* 检验邮箱 */
	vtEmail : function(id) {
		var errId = id + "Err";
		if (!_jM.validate.isNotEmpty($("#" + id).val())) {
			_jM.toolTip.show(errId, "账号不能为空");
			return false;
		}
		if (!_jM.validate.isEmail($("#" + id).val())) {
			_jM.toolTip.show(errId, "请输入正确的邮箱");
			return false;
		}
		_jM.toolTip.hide(errId);
		return true;
	},
	/* 校验图片 */
	vtImg : function(id) {
		var errId = errId || id + "Err";
		var regex = "";
		var uploadFormat = [ "bmp", "jpg", "png", "jpeg", "gif", "pcx", "tga",
				"exif", "fpx", "svg", "psd", "cdr", "pcd", "dxf", "ufo", "Eps" ];
		var fileName = $("#" + id)[0].files[0].name;
		var size = $("#" + id)[0].files[0].size;

		for (var i = 0; i < uploadFormat.length; i++) {
			regex += "." + uploadFormat[i]
					+ (i == uploadFormat.length - 1 ? "" : "|");
		}
		regex = new RegExp(regex);

		if (!regex.test(fileName.toLowerCase())) {
			_jM.toolTip.show(errId, "不支持" + _jM.postf(fileName) + "格式");
			return false;
		}
		if (size > 500 * 1024) {
			_jM.toolTip.show(errId, "文件大小不能超过500k");
			return false;
		}

		_jM.toolTip.hide(errId);
		return true;
	},
	/* 校验手机 */
	vtPhone : function(id) {
		var errId = id + "Err";
		if (!_jM.validate.isNotEmpty($("#" + id).val())) {
			_jM.toolTip.show(errId, "请输入手机号码");
			return false;
		}
		if (!_jM.validate.isPhone($("#" + id).val())) {
			_jM.toolTip.show(errId, "请输入正确格式的手机号码");
			return false;
		}
		_jM.toolTip.hide(errId);
		return true;
	},
	/* 校验长度 */
	vtlang : function(id, min, max) {
		var errId = id + "Err";
		if (!_jM.validate.isLengthBetween($("#" + id).val(), min, max)) {
			_jM.toolTip.show(errId, "请输入" + min + "到" + max + "个字符。");
			return false;
		}
		;
		_jM.toolTip.hide(errId);
		return true;
	}
}

/* 提示信息 */
jModule.prototype.toolTip = {
	show : function(errId, txt) {
		$("#" + errId).html(txt);
		$("#" + errId).slideDown();
		window.location.href = "#" + errId;
	},
	hide : function(errId) {
		$("#" + errId).html("");
		$("#" + errId).slideUp();
	},
	tip : function(txt, callbackP) {
		callbackP = callbackP || function() {
		};
		_jM.toolTip.distip(txt, function() {
			$("#toolTipId").click(function() {
				if ($("#toolTipId").length > 0) {
					$("#toolTipId").remove();
					callbackP();
				}
			});
		}, callbackP);
	},
	distip : function(txt, callbackC, callback) {
		var html = "";
		html += "<div class='modal-layer toolTip-tip-wrapper' id='toolTipId'>"
		html += "<div class='toolTip-tip'>" + txt + "</div>";
		html += "</div>"
		$(document.body).append(html);

		callbackC();

		setTimeout(function() {
			$("#toolTipId").remove();
			callback();
		}, 1500)
	}
}
/* loading */
jModule.prototype.loadFun = {
	show : function(id) {
		var id = id || "loadidls"
		if ($("#" + id).length > 0)
			return;
		if ($(".load-wrapper").length > 0) {
			var html = '<input id="' + id + '" class="loadid" type="hidden">'
		} else {
			var html = '<div class="load-wrapper">\
							<div class="load-img-box">'
					+ '<img alt="loading" src="/mrportal/resources/util/images/loading.gif">'
					+ '</div>' + '</div>';
			html += '<input id="' + id + '" class="loadid" type="hidden">'
		}

		$(document.body).append(html);
	},
	hide : function(id) {
		var id = id || "loadidls";
		if ($("#" + id).length <= 0)
			return;
		$("#" + id).remove();
		var classList = $(".loadid");
		if (classList.length <= 0) {
			$(".load-wrapper").remove();
		}
	}
};

jModule.prototype.keyboard = {
	/* 监测key事件，隐藏提示信息 */
	vtKeyup : function(id, errId) {
		errId = errId || id + "Err";
		$("#" + id).keyup(function(e) {
			var e = e || event || window.event;
			var keyCode = e.keyCode || e.which; // 按键的keyCode
			if (keyCode != 13) {
				if (_jM.validate.isNotEmpty($("#" + id).val())) {
					_jM.toolTip.hide(errId);
				}
			}
		});
	},
	/* 监测key事件，隐藏提示信息 */
	vtKeyupList : function(id, listId) {
		var errId = id + "Err";
		$("#" + id).keyup(function(e) {
			var e = e || event || window.event;
			var keyCode = e.keyCode || e.which; // 按键的keyCode
			if (keyCode != 13) {
				if (_jM.validate.isNotEmpty($("#" + id).val())) {
					_jM.toolTip.hide(errId);
					for (var i = 0; i < listId.length; i++) {
						_jM.toolTip.hide(listId[i]);
					}
				}
			}
		});
	},
	/* 键盘大小写 */
	capital : function(id, tip) {
		$("#" + id)
				.keyup(
						function(e) {
							var flag;
							var e = e || event || window.event;
							var o = e.target || e.srcElement;
							var oTip = o.nextSibling;
							var keyCode = e.keyCode || e.which; // 按键的keyCode
							var isShift = e.shiftKey || (keyCode == 16)
									|| false; // shift键是否按住
							var strlen = $("#" + id).val().length;
							if (strlen) {
								var uniCode = $("#" + id).val().charCodeAt(
										$("#" + id).val().length - 1);
								if (keyCode >= 65 && keyCode <= 90) {
									if (((uniCode >= 65 && uniCode <= 90) && !isShift)
											|| ((uniCode >= 97 && uniCode <= 122) && isShift)) {
										$("#" + tip).show();
									} else {
										$("#" + tip).hide();
									}
								}
							}

							if (keyCode == 20 && !$("#" + tip).is(":hidden")) {
								$("#" + tip).hide();
							}
						});
	},
	/* enter事件 */
	enterSub : function(id, fun) {
		$("#" + id).keydown(function(event) {
			event = document.all ? window.event : event;
			if ((event.keyCode || event.which) == 13) {
				fun();
			}
		});
	},
	/* 邮箱自动补全 */
	suppEmail:{
		getEmail : function(id, nextId) {
			var nowid;
			var totalid;
			var can1press = false;
			var emailafter;
			var emailbefor;

			$("#" + id).focus(
					function() {
						$("#myemail").remove();
						$("#" + id).after(
								"<ul id='myemail' class='suppEmail'></ul>");

						var top = _jM.suppEmail.getAbsoluteOffsetTop(document
								.getElementById(id));
						var left = _jM.suppEmail.getAbsoluteOffsetLeft(document
								.getElementById(id));

						$("#myemail").css("width", $("#" + id).width() + 20);
						$("#myemail").css("top", top + $("#" + id).height() - 60);
						$("#myemail").css("left", left);
						$("#myemail").css("padding-left",
								$("#" + id).css("padding-left"));

						if ($("#myemail").html()) {
							$("#myemail").css("display", "block");
							can1press = true;
						} else {
							$("#myemail").css("display", "none");
							can1press = false;
						}

					}).keyup(
					function() {
						var press = $("#" + id).val();
						if (_jM.validate.isNotEmpty(press)) {
							var emailtxt = "";
							var emailvar = new Array("@163.com", "@139.com",
									"@sohu.com", "@qq.com", "@126.com", "@tom.com",
									"@sina.com", "@outlook.com", "@foxmail.com",
									"@2980.com", "@21cn.com", "@188.com",
									"@263.com");
							if (!(isEmail(press))) {
								for (var i = 0; i < emailvar.length; i++) {
									emailtxt = emailtxt + "<li class='newemail'>"
											+ press + emailvar[i] + "</li>"
								}
							} else {
								emailbefor = press.split("@")[0];
								emailafter = "@" + press.split("@")[1];
								for (var i = 0; i < emailvar.length; i++) {
									var theemail = emailvar[i];
									if (theemail.indexOf(emailafter) == 0) {
										if (theemail == emailafter) {
											$("#myemail").remove();
										} else {
											emailtxt = emailtxt
													+ "<li class='newemail'>"
													+ emailbefor + emailvar[i]
													+ "</li>"
										}
									}
								}
							}
							$("#myemail").html(emailtxt);
							if ($("#myemail").html()) {
								$("#myemail").css("display", "block");
								can1press = true;
							} else {
								$("#myemail").css("display", "none");
								can1press = false;
							}
						} else {
							$("#myemail").html("");
							$("#myemail").css("display", "none");
						}
					});
			$(document).click(function() {
				if (can1press) {
					$("#myemail").remove();
					can1press = false;
				}
			});
			$(".section").on("click", ".newemail", function() {
				$("#" + id).val($(this).html());
				$("#myemail").remove();
				$("#" + nextId).focus();
			});
			function isEmail(str) {
				if (str.indexOf("@") > 0) {
					return true;
				} else {
					return false;
				}
			}
		},
		setEmail : function(e, id) {
			$("#" + id).html($(e).html());
		},
		getAbsoluteOffsetTop : function(obj) {
			var y = obj.offsetTop;
			while (obj = obj.offsetParent)
				y += obj.offsetTop;
			return y;
		},
		getAbsoluteOffsetLeft : function(obj) {
			var x = obj.offsetLeft;
			while (obj = obj.offsetParent)
				x += obj.offsetLeft;
			return x;
		}
	}
}

/* 获取验证码按钮倒计时 */
jModule.prototype.codeTime = function(id, txt) {
	txt = txt || "点击获取验证码";
	if ($("#" + id + ".disabled").length > 0)
		return;
	var second = 60;
	$("#" + id).html(second + "秒后重发");
	$("#" + id).addClass("disabled");
	var codetime = window.setInterval(function() {
		if (second > 0) {
			second--;
			$("#" + id).html(second + "秒后重发");
		} else {
			window.clearInterval(codetime);
			$("#" + id).removeClass("disabled");
			$("#" + id).html(txt);
		}
	}, 1000)
}

// Get param.
jModule.prototype.getParam = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
// Set cookie
jModule.prototype.setCookie = function(name, value, hours, path) {
	var Hours = hours;
	var exp = new Date();
	exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
	document.cookie = name + "=" + encodeURIComponent(value) + ";expires="
			+ exp.toGMTString() + ";path=" + path;
}

// Get cookies
jModule.prototype.getCookie = function(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return decodeURIComponent(arr[2]);
	else
		return null;
}

/* jquery post下载文件 */
jModule.prototype.DownLoadFile = function(options) {
	var config = $.extend(true, {
		method : 'post'
	}, options);
	var $iframe = $('<iframe id="down-file-iframe" />');
	var $form = $('<form target="down-file-iframe" method="' + config.method
			+ '" />');
	$form.attr('action', config.url);
	for ( var key in config.data) {
		$form.append('<input type="hidden" name="' + key + '" value="'
				+ config.data[key] + '" />');
	}
	$iframe.append($form);
	$(document.body).append($iframe);
	$form[0].submit();
	$iframe.remove();
}

jModule.prototype.post = function(url, params, success, error) {
	$.post(url, params, function(res) {
		res = eval('(' + res + ')');
		if (res.code == 0) {
			var data = null;
			if (res.data) {
				data = res.data
			}
			success(res, data);
		} else {
			if (error) {
				error(res);
			} else {
				errorOut();
			}
		}
	});
}

/* 提取文件名 */
jModule.prototype.filename = function(fileName) {
	var index1 = fileName.lastIndexOf("/");
	var index2 = fileName.length;
	var postf = fileName.substring(index1, index2);
	return postf.substring(1, postf.length);
}

/* 提取后缀名 */
jModule.prototype.postf = function(fileName) {
	var index1 = fileName.lastIndexOf(".");
	var index2 = fileName.length;
	var postf = fileName.substring(index1, index2);
	return postf;
}

jModule.prototype.clear_script = function(str) {
	return str
			.replace(
					/<script.*?>[\s\S]*?<\/script>|\s+on[a-zA-Z]{3,16}\s?=\s?"[\s\S]*?"|\s+on[a-zA-Z]{3,16}\s?=\s?'[\s\S]*?'|\s+on[a-zA-Z]{3,16}\s?=[^ >]+/ig,
					"");
};

/* 隐藏敏感信息 */
jModule.prototype.hideInfo = {
	hideName : function(username) {
		/*
		 * var preName = username.split("@")[0]; var nextName =
		 * username.split("@")[1]; var finallyName = preName.substr(0,
		 * preName.length >= 3 ? 3 : preName.length) + "***@" + nextName; return
		 * finallyName;
		 */

		return username.substr(0, 3) + "****"
				+ username.substr(username.length - 6, username.length - 1);
	},
	hidePhone : function(mobile) {
		var finallyPhone = mobile.substr(0, 3) + "****" + mobile.substr(7, 10);
		return finallyPhone;
	}
}

/* 时间戳转换日期 */
jModule.prototype.Format=function(timeStamp,formatStr){
	var date = new Date();
	date.setTime(timeStamp * 1000);
	return date.Format(formatStr);
}
jModule.prototype.Format=function(date,formatStr){
	return date.Format(formatStr);
}
Date.prototype.Format = function(formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, (this.getMonth() + 1));
    str = str.replace(/w|W/g, Week[this.getDay()]);
    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());
    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());
    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str
};



/* 判断IE */
jModule.prototype.isIE = function() {
	if (!!window.ActiveXObject || "ActiveXObject" in window) {
		return true;
	} else {
		return false;
	}
}
//获取窗口高度
jModule.prototype.winHeight = function() {
	var winHeight = 0;
	if (window.innerHeight)
		winHeight = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight))
		winHeight = document.body.clientHeight;
	return winHeight;
}

jModule.prototype.switchTab = function(id) {
	$("#" + id).addClass("active").siblings(".active").removeClass("active");
}