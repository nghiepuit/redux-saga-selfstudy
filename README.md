NEW LIFECYCLE REACTJS

_ componentWillReceiveProps => static getDerivedStateFromProps
_ Action & Action Creator :
	+ Action: là 1 object - mô tả 1 event.
	+ Action creators: là 1 function - return về actions.
_ Why action creators: 
	+ Chỉ cần quan tâm là các đối số cần.
	+ Không cần quan tâm đến cấu trúc của payload.
	+ Sẽ implement các logic trong action creators. Ngay cả việc gọi AJAX, redirect routing, notification.
	+ Handle side effects.
	+ Kiến trúc: View => Action creator => Action
_ Middleware : là 1 function đã registered ( applyMiddleware ) với store, run sau khi action được dispatch và trước khi vào reducer. Lưu ý khi toàn bộ middleware hoàn tất, action mới được chuyển đến reducers để calculate, update state.
_ Redux saga: được xây dựng bằng các function có thể tạm dừng và tiếp tục. Gọi là generators.
	+ Generator function : có thể paused và resumed.
	+ Yield : sử dụng return ra giá trị của generator function.
	+ Kết quả return : Iterators ( là 1 object - khác rỗng )
	+ Iterator có 1 next function, dùng thực thi code đến next yield
	+ Lưu trữ : Nên lưu trữ 1 iterator thay vì thực thi trực tiếp generator function ( sẽ tạo ra nhiều iterator )
_ Yield :
	+ Yield* dùng delegate sang generator khác.
_ 3 Method Redux Saga : yield, return, throw. Yield là function có thể return value nhưng giá trị done sẽ là false.
_ Fork: Khi root saga được thực thi, nó sẽ dừng ( paused ) ở mỗi từ khoá yield cho đến khi side effect hoàn thành ( completed ). Tuy nhiên rootSaga cho phép chuyển sang yield khác, VD : khởi tạo tất cả watcher ( bộ lắng nghe ).
	+ Giúp quản lý side effects.
	+ Những gì viết trong saga là xử lý side effects. ( AJAX Request )
_ Take: wake up và tham gia vào saga. Khác với fork, dùng để chặn lời gọi, vòng lặp vô hạn sẽ dừng khi take(ACTION) - khi ACTION đi cùng. Chỉ đi tiếp sau khi ACTION đã dispatched.  VD : Gọi fetchTask => tham gia vào saga.
_ Put: gửi action. Nhận vào 1 action chuyển đến các middleware còn lại và đến reducers. Dùng để dispatch action trong sagas khi cần.
_ Call : là 1 blocking method sử dụng cụ thể cho lời gọi AJAX.
_ takeLastest: Huỷ request chưa hoàn thành, thay thế fork, huỷ tiến trình cũ khi có 1 tiến trình mới bắt đầu. Không bắt buộc dùng vòng lặp vô hạn để lắng nghe action, vì takeLastest sẽ luôn lắng nghe action. ( Như fork được mở rộng thêm function)
_ Xử lý long-running processes ( dài hạn ): tăng-giảm-dừng thời gian.
_ Delay : là 1 blocking method. Saga sẽ pause cho đến khi blocking method được resolve.
  + Delay là 1 đối số.
  + Có thể là đối số của call.
  + Không tạo ra 1 đối tượng effect, không cùng loại với effect helpers khác.
_ takeEvery: dùng để check mỗi khi action type nào đ1o được dispatch.
	+ 1 takeEvery sẽ start 1 tiến trình mới mỗi khi action được dispatch.
	+ Không thể tương tác giữa các tiến trình này. ( dừng, thay đổi )
	+ Sinh ra một tiến trình saga mới với mỗi action.
	+ Nếu sử dụng takeLatest thay thế thì chỉ có duy nhất 1 đối tượng xử lý.
_ Channel : có chức năng của takeLatest, nếu start 1 tiến trình => thì có thể dừng đúng tiến trình đó
	+ là 1 redux-saga util.
	+ Là đối tượng sử dụng gửi và nhận giữa các tác vụ.
	+ Sử dụng để đặt tên cho 1 tiến trình saga và có thể gọi lại.
	+ Dùng để check là task đã tồn tại trong channel chưa.
	+ Thuộc redux-saga như delay.