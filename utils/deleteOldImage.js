const fs = require('fs');
const path = require('path');

function deleteManyOldImage(imagePath) {
    imagePath.map(item => {
        const fullImagePath = path.join(item);
        fs.unlink(fullImagePath, (error) => {
            if (error) {
                console.log("Wrong");
            } else {
                console.log("Old image deleted");

            }
        })
    })

}


function deleteSingleOldImage(imagePath) {
    const fullImagePath = path.join(imagePath);
    fs.unlink(fullImagePath, (error) => {
        if (error) {
            console.log("Wrong");
        } else {
            console.log("Old image deleted");

        }
    })
}

module.exports = { deleteManyOldImage, deleteSingleOldImage }