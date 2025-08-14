import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./YellowPlan.scss";
import { withRouter } from "react-router-dom";
import { getAllProducts } from "../../../services/productService";
import { createNewCartService, getCartByUser, editCartService } from "../../../services/cartService";
import AlertContainer from "../../../components/AlertContainer";

const YellowPlan = (props) => {
  const yellowPlanRef = useRef(null); // Ref đến section cần thiết
  const alertRef = useRef(null);
  const [arrCheckout, setArrCheckout] = useState(null); // setArrCheckout là hàm để cập nhật trạng thái của arrCheckout, arrCheckout là trạng thái lưu dữ liệu sản phẩm
  const [quantity, setQuantity] = useState(1); // setQuantity là hàm để cập nhật trạng thái của số lượng, quantity là trạng thái lưu số lượng sản phẩm
  const [userId, setUserId] = useState(props.userInfo ? props.userInfo.id : null); // setUserId là hàm để cập nhật trạng thái của userId, userId là trạng thái lưu id của người dùng
  const [productId, setProductId] = useState(1);

  // Hàm chuyển trang
  useEffect(() => {
    const targetScrollTop = props.location?.state.targetScrollTop || 0;
    if (yellowPlanRef.current && targetScrollTop) {
      yellowPlanRef.current.scrollIntoView({ behavior: "auto" });
    }
    if (props.location?.state?.targetScrollTop) {
      props.history.replace({
        ...props.location,
        state: {
          ...props.location.state,
          targetScrollTop: 0,
        },
      });
    }
  }, [props.location, props.history]);

  const handleNavigate = (path) => {
    props.history.push(path);
  };

  useEffect(() => {
      let isMounted = true; // Biến cờ để kiểm tra xem component đã unmount hay chưa

      const fetchData = async () => {
          let response = await getAllProducts("1");
          if (isMounted && response && response.errCode === 0) {
              setArrCheckout(response.products);
          }
      };

      fetchData();

      return () => {
          isMounted = false; // Đặt cờ thành false khi component unmount
      };
  }, []);

  const handleAddNewCart = async () => {
		try {
			// Lấy danh sách giỏ hàng của người dùng
			const cartResponse = await getCartByUser(userId, "pending");
			if (cartResponse.errCode !== 0) {
				alert("Lấy dữ liệu giỏ hàng không thành công");
				return;
			}
	
			const carts = cartResponse.carts || [];
			const existingCart = carts.find(
				(cart) => cart.user_id === userId && cart.product_id === productId
			);
	
			if (existingCart) {
				// Nếu sản phẩm đã tồn tại, gọi API cập nhật (editCartService)
				const updatedQuantity = parseInt(existingCart.quantity, 10) + parseInt(quantity, 10); // Chuyển sang số nguyên
				const updateData = {
					id: existingCart.id,
					product_id: productId,
					quantity: updatedQuantity,
				};
				const updateResponse = await editCartService(updateData);
				if (updateResponse.errCode !== 0) {
					alert(updateResponse.errMessage);
				} else {
					showAlert("Cập nhật số lượng thành công", "success");
				}
			} else {
				// Nếu sản phẩm chưa tồn tại, thêm mới
				const newCartData = {
					user_id: userId,
					product_id: productId,
					quantity: quantity,
				};
				const addResponse = await createNewCartService(newCartData);
				if (addResponse.errCode !== 0) {
					alert(addResponse.errMessage);
				} else {
					showAlert("Thêm sản phẩm mới vào giỏ hàng thành công", "success");
				}
			}
		} catch (error) {
			console.error("handleAddNewCart error:", error);
		}
	};

  const handleOnChange = (e) => {
    setQuantity(e.target.value);
  };

  const showAlert = (message, type) => {
    if (alertRef.current) {
        alertRef.current.showAlert(message, type);
    }
  };

  return (
    <div className="YellowPlan-container" ref={yellowPlanRef}>
      <div className="YellowPlan-content">
        <div className="YellowPlan-content-left">
          <div className="YellowPlan-image">
          </div>
        </div>
        <div className="YellowPlan-content-right">
          <div className="title-YellowPlan">
            <h1>Gói Vàng</h1>
            <p>700.000 VND</p>
          </div>
          <div className="buy-product-YellowPlan">
            <div className="bg">
              <h3>Bạn có muốn ủng hộ sản phẩm này không?</h3>
              <p>
                Khi bạn đăng ký, chúng tôi sẽ đặt một đơn hàng mới với sản phẩm này. Bạn sẽ tự động bị tính phí 700.000 VND cho mỗi đơn hàng. Bạn có thể dễ dàng quản lý đăng ký của mình hoặc hủy bỏ bất kỳ lúc nào mà không có khoản phí thêm.
              </p>
              <span>1 món trong giỏ hàng</span>
            </div>
            <div className="product-content">
              <div className="product-content-qty">
                <label><span>Số lượng:</span></label>
              </div>
              <div className="qty">
                <input
                  type="number"
                  id="quantity"
                  className="quantity"
                  min="1" max="100"
                  placeholder="1"
                  value={quantity || ""}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="product-purchase-controll">
              <div className="btn-action">
                <button
                  className="add-btn"
                  onClick={handleAddNewCart}
                >
                  Thêm vào giỏ hàng
                </button>
                <button
                  className="go-to-check-btn"
                  onClick={() => handleNavigate("/checkout")}
                >
                 Thanh Toán
                </button>
              </div>
            </div>
            <div className="description">
              <p>
                {arrCheckout?.description}
              </p>
              <p><strong>Trồng 20 cây mỗi tháng</strong></p>
              <p><strong>Cân bằng 400kgs CO2 mỗi tháng</strong></p>
            </div>
            <div className="product-share">
              <h3>Chia sẻ sản phẩm này với bạn bè</h3>
              <div className="share-content">
                <i className="fab fa-facebook"></i>
                <i className="fab fa-telegram"></i>
                <i className="fab fa-instagram"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AlertContainer ref={alertRef} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

export default withRouter(connect(mapStateToProps)(YellowPlan));
