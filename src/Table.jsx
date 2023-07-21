import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Table } from "antd";

const MyTable = () => {
    
  const [data, setData] = useState([]); // Sử dụng một mảng rỗng để lưu trữ dữ liệu từ API
 

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      
    },
    {
      title: "Thông tin",
      dataIndex: "giftName",
     
    },
  ];

  // Sử dụng useEffect để gọi API khi component MyTable được render lần đầu tiên
  useEffect(() => {
    // Gọi API tại đây
    axios
      .get("http://localhost:3000/user_gifts")
      .then((response) => {
        // Kiểm tra nếu dữ liệu từ API hợp lệ (mảng dữ liệu không rỗng)
        if (Array.isArray(response.data) && response.data.length > 0) {
          setData(response.data); // Lưu dữ liệu vào state data
        }
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []); // Truyền một mảng rỗng vào để đảm bảo useEffect chỉ chạy một lần khi component được render lần đầu tiên

  return (
  
  <Card>

    <Button >Quay lại</Button>
    <Table dataSource={data} columns={columns} />
    </Card>)
};

export default MyTable;
