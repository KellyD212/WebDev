
const {getPersonById, sameStreet, manipulateSsn, sameBirthday, getPeople}  = require("./people");
const {listShareholders, topShareholder, listStocks, getStockById} = require("./stocks");

async function main(){
    //get person by id test
    try{
        const getPersonOne = await getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10");
        console.log(getPersonOne);
        //console.log(await getPersonById(4));
        //console.log(await getPersonById());
        //console.log(await getPersonById('   '));
        //console.log(await getPersonById("989fa5e-8f3f-458d-ad58-23c8d9ef5a10"));
    }catch(e){
        console.log(e);
    }
    //sameStreet tests
    try{
        const samest = await sameStreet("Sutherland", "point");
        console.log(samest);
        //console.log(await sameStreet(4));
        //console.log(await sameStreet(4, 5));
        //console.log(await sameStreet('   ', ' '));
        //console.log(await sameStreet("Crownhardt","Park"));

    }catch(e){
        console.log(e);
    }
    //manipulateSsn tests
    try{
        const manipulateOne = await manipulateSsn();
        console.log(manipulateOne);
    }catch(e){
        console.log(e);
    }
    //sameBirthday tests
    try{
        const bdayOne = await sameBirthday(09, 25);
        console.log(bdayOne);
        //console.log(await sameBirthday('9','25'));
        //console.log(await sameBirthday(13,3));
        //console.log(await sameBirthday('t',3));
        //console.log(await sameBirthday(2,29));
        //console.log(await sameBirthday());

    }catch(e){
        console.log(e);
    }
    //listShareholders tests
    try{
        const listShareholdersOne = await listShareholders();
        console.log(listShareholdersOne);
    }catch(e){
        console.log(e);
    }
    //topShareholder tests
    try{
        const topOne = await topShareholder('Aeglea BioTherapeutics, Inc.');
        console.log(topOne);
        console.log(await topShareholder('Nuveen Floating Rate Income Fund'));
        console.log(await topShareholder('Powell Industries, Inc.')); 
        //console.log(await topShareholder('433')); 
        //console.log(await topShareholder('  ')); 
        //console.log(await topShareholder()); 
    }catch(e){
        console.log(e);
    }
    //listStocks tests
    try{
        const liststocksOne = await listStocks("Grenville", "Pawelke");
        console.log(liststocksOne);
        //console.log(await listStocks('Patrick', "Hill"));
        //console.log(await listStocks());
        //console.log(await listStocks('foo'));
        //console.log(await listStocks("   ", "   "));
        //console.log(await listStocks(1, 2));
    }catch(e){
        console.log(e);
    }
    //getStockById tests
    try{
        const getStockOne = await getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0");
        console.log(getStockOne);
        //console.log(await getStockById(-1));
        //console.log(await getStockById('  '));
        //console.log(await getStockById());
        //console.log(await getStockById('7989fa5e-5617-43f7-a931-46036f9dbcff'));
    }catch(e){
        console.log(e);
    }
}

//call main
main();