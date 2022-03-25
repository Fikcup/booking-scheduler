/**
 * AddressDto
 * Author: Rhys Wright
 * Description: Outlines the expected fields of an address object
 * Usage: Validate that the datatypes recieved from the frontend are as expected
 */

class AddressDto {
    street: string;
    city: string;
    state: string;
    zip: number;
}

export default AddressDto;