import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
interface propsData {
    headers:string[];
    data:{
        _id: string;
        productName:string;
        productDescription:string;
        productPrice:number;
        productCategory:string;
        productQuantity:number;
        image: {
          productImageUrl: string;
          productImagePublicId: string
        }
    }[]| [];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}
const GenericTable = ({ headers,  data,  onEdit, onDelete }:propsData) => {

  return (
<table className="border-collapse border border-gray-300 w-full  overflow-x-auto  whitespace-nowrap rounded-md">
  {/* Table Header */}
  <thead>
    <tr>
      {headers.map((header, index) => (
        <th key={index} className="border-b px-4 py-2">
          {header}
        </th>
      ))}
    </tr>
  </thead>

  {/* Table Body */}
  <tbody>
    {data?.length > 0 ? (
      data.map((item, idx) => (
        <tr key={idx}>
          {headers.map((header, index) => {
            if (header.toLowerCase() === 'actions') {
              return (
                <td key={index} className="text-center">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-green-500 mr-2 cursor-pointer"
                    onClick={() => onEdit(item._id)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 cursor-pointer"
                    onClick={() => onDelete(item._id)}
                  />
                </td>
              );
            }

            if (header.toLowerCase() === 'sno') {
              return (
                <td key={index} className="px-4 py-2 text-center">
                  {idx + 1}
                </td>
              );
            }

            // Optional: Custom rendering for productDescription
                if (header === 'image') {
                  return (
                    <td
                      key={index}
                      className={`px-4 py-2 text-center`}
                    >
                      <Image className='rounded-full w-10 h-10 mx-auto' width={40}  height={40} src={item.image.productImageUrl} alt="Logo" />

                    </td>
                  );
                }

                 if (header === 'productDescription') {
                  return (
                    <td
                      key={index}
                      className={`px-4 py-2 text-center`}
                    >
                      <p className='w-[400px] text-start'>
                        {item[header] ?.length > 50? `${item[header].substring(0,50)}...`:item[header]}
                      </p>

                    </td>
                  );
                }

            return (
              <td key={index} className="px-4 py-2 text-center">
                {item[header as keyof typeof item]}
              </td>
            );
          })}
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={headers.length} className="px-4 py-2 text-center text-gray-500">
          <FontAwesomeIcon icon={faBoxOpen} size="2x" />
        </td>
      </tr>
    )}
  </tbody>
</table>

  );
};

export default GenericTable;