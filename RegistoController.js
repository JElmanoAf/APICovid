//Import Covid Model
Covid = require('./RegistoModel');
//Para index
exports.index = function (req, res) {
var arrayCasos = [];
var darrayData = [];
var totalCasos = 0;
var arrayIntensivos = [];
Covid.get(function (err, covid) {
if (err)res.json({status: "error",message: err});
for(var i=0; i<covid.length; i++){arrayCasos.push(covid[i].confirmados_novos)
arrayIntensivos.push(covid[i].internados_uci)
darrayData.push(covid[i].data)
totalCasos += Number(covid[i].confirmados_novos);}
var maximo = null;
maximo = Math.max(...arrayCasos);
var IndiceMax = arrayCasos.indexOf(maximo);
var minimo = null;
minimo = Math.min(...arrayCasos);
var IndiceMin = arrayCasos.indexOf(minimo);
var media = null;
media = totalCasos/covid.length;
res.json({
novosCasos: arrayCasos,
internadosUCI: arrayIntensivos,
Maximo: darrayData[IndiceMax],
Minimo: darrayData[IndiceMin],
totalCasos: totalCasos,Media: media,});});};
//Criar nova BIO
exports.add = function (req, res) {
var covid = new Covid();
covid.data = req.body.data? req.body.data: covid.data;
covid.confirmados_novos = req.body.confirmados_novos;
covid.internados_uci = req.body.internados_uci;
//Guardar e verificar erros
covid.save(function (err) {
if (err)res.json(err);
res.json({message: "Nova Covid Adicionada!",data: covid});});};
// Ver Covid
exports.view = function (req, res) {
Covid.findById(req.params.covid_id, function (err, covid) {
if (err)res.send(err);
res.json({message: 'Detalhes da Covid',data: covid});});};
// Atualizar Covid
exports.update = function (req, res) {
Covid.findById(req.params.covid_id, function (err, covid) {
if (err)res.send(err);
covid.nome = req.body.nome ? req.body.nome : covid.nome;
covid.email = req.body.email;
covid.telef = req.body.telef;
covid.morada = req.body.morada;
//Guardar e verificar erros
covid.save(function (err) {
if (err)res.json(err);
res.json({
message: "Covid Updated Successfully",data: covid});});});};
// Apagar Covid
exports.delete = function (req, res) {
Covid.deleteOne({_id: req.params.covid_id}, function (err, contact) {
if (err)res.send(err);
res.json({
status: "OK",message: 'Covid Eliminada!'
});});};