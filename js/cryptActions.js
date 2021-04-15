// txt: texte à crypter
function crypt(txt) {
	const crypt = new JSEncrypt()
	crypt.setKey(localStorage.getItem("pubkey"))
	return crypt.encrypt(txt)
}

// txt: texte à décrypter
function decrypt(num, txt) {
	const crypt = new JSEncrypt()
	crypt.setKey(localStorage.getItem("privkey" + num))
	localStorage.removeItem("privkey" + num)
	return crypt.decrypt(txt)
}