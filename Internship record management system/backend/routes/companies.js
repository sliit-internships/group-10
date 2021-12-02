const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const router = express.Router()
const multer = require('multer');
const readXlsxFile = require('read-excel-file/node');

const app = express();

const excelFilter = (req, file, cb) => {
	if (
	  file.mimetype.includes("excel") ||
	  file.mimetype.includes("spreadsheetml")
	) {
	  cb(null, true);
	} else {
	  cb("Please upload only excel file.", false);
	}
};

// -> Multer Upload Storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	   cb(null, __basedir + '/uploads/')
	},
	filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" +Date.now() + "-" + file.originalname)
	}
});

const upload = multer({storage: storage, fileFilter: excelFilter});

// @route   POST api/companies/uploadfile
// @desc    upload excel file of companies
// @access  Private
router.post('/uploadfile', upload.single("uploadfile"), (req, res) =>{
	let query = 'DELETE FROM companies';
	db.query(query, (err, result) => {
		if(err) throw err;
		console.log(result);
	});	
	importExcelData2MySQL(__basedir + '/uploads/' + req.file.filename);

		res.json({
			'msg': 'File uploaded/import successfully!', 'file': req.file
		});
	
});

function importExcelData2MySQL(filePath){
	// File path.
	readXlsxFile(filePath).then((rows) => {
		// `rows` is an array of rows
		// each row being an array of cells.	 
		console.log(rows);
	 
		// Remove Header ROW
		rows.shift();
	  
		let query = 'INSERT INTO companies (id, name, address, size, registeredYear, registeredCounty) VALUES ?';
		db.query(query, [rows], (err, result) => {
            if(err) throw err;
            console.log(result);
		});	
	})
}

// @route   GET api/companies/getCompanies
// @desc    Get all companies
// @access  Private
router.get('/getCompanies', (req, res) => {
	  let sql = 'SELECT * FROM companies';
	  db.query(sql, (err, result) => {
		  if(err) throw err;
		  res.send(result);
	  });  
  })

module.exports = router