
function normalize(data) {
    len = 0;
    for (var i=0; i < data.length; i++) {
        len += (data[i] * data[i]);
    }
    len = Math.sqrt(len);

    for (var j=0; j < data.length; j++) {
        data[j] = data[j]/len;
    }
    return data;
}
