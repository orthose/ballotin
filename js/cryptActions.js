// txt: texte à crypter
function crypt(txt) {
	const crypt = new JSEncrypt()
	crypt.setKey(localStorage.getItem("pubkey"))
	return crypt.encrypt(txt)
}

// txt: texte à décrypter
function decrypt(txt) {
	const crypt = new JSEncrypt()
	crypt.setKey(localStorage.getItem("privkey"))
	return crypt.decrypt(txt)
}