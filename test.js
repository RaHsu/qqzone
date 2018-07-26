function unRepeatObject(arr){
			var tmepArr = [];
			// 将数组对象转成数组字符串
			var newStr = changeArrStr(arr);
			newStr.sort();
			// 数组去重
			for(var i=0;i<newStr.length;i++){
				if(newStr[i] !== tmepArr[tmepArr.length-1]){
					tmepArr.push(newStr[i]);
				}
			}
			var newArr = [];
			// 新数组字符串转成数组对象
			for(var i=0;i<tmepArr.length;i++){
				newArr.push(JSON.parse(tmepArr[i]));
			}
			return newArr;
		}


		function changeArrStr(arr){
			var newArr = [];
			if(arr.length !== 0){
				for(var i=0;i<arr.length;i++){
					var thisObj = sortObjectFun(arr[i]);
					var thisStr = JSON.stringify(thisObj);
					thisStr = thisStr.replace(/(\s|[\\t])/g,''); // 去除空格及\t空白字符
					newArr.push(thisStr);
				}
			}
			return newArr;
		}
function sortObjectFun(obj){
			var keyArr = [];// 对象的key
			for(var item in obj){
				keyArr.push(item);
			};
			keyArr.sort(); // 降序
			var newObj = {};
			for(var i=0;i<keyArr.length;i++){
				newObj[keyArr[i]] = obj[keyArr[i]]
			}
			return newObj;
		}

var a = [{id:121},{id:1},{id:2},{id:3},{id:3},{id:3},{id:4},{id:5},{id:6},{id:6},{id:7},];
console.log(unRepeatObject(a));