package com.g6734.g6734.ui.page2

import android.annotation.SuppressLint
import android.graphics.Color
import android.net.Uri
import android.os.Bundle
import android.util.TypedValue
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.fragment.app.Fragment
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.g6734.g6734.DataStorage
import com.g6734.g6734.R
import kotlinx.android.synthetic.main.fragment_dashboard.*
import org.json.JSONArray
import org.json.JSONObject

class DashboardFragment : Fragment() {


   var liveData : MutableLiveData<JSONObject> = MutableLiveData<JSONObject>()


    private lateinit var dashboardViewModel: DashboardViewModel



    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        dashboardViewModel =
                ViewModelProviders.of(this).get(DashboardViewModel::class.java)
        val root = inflater.inflate(R.layout.fragment_dashboard, container, false)

        return root
    }


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        getQuery();

       liveData.observe(this, object: Observer<JSONObject> {
            override fun onChanged(json: JSONObject?) {
                var t= json
                msgscreen()
                update_card(json)
//                liveData.removeObserver(this)
            }
        })
    }


 @SuppressLint("ResourceAsColor")
 fun update_card(json:JSONObject?){
     allert5436.visibility = View.INVISIBLE

    var t=json
     val jsonArray: JSONArray = json!!.getJSONArray("ProductCollection")
     for (i in 0 until jsonArray.length()) {
         var jsonInner: JSONObject = jsonArray.getJSONObject(i)
         var id = jsonInner.get("id")
         if (id.toString().compareTo("0")!= 0) {
             val Lin: LinearLayout = LinearLayout(this.context)
             Lin.setOrientation(LinearLayout.VERTICAL);
             Lin.setBackgroundResource(R.drawable.shape0548)
             var param: RelativeLayout.LayoutParams =
                 RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.MATCH_PARENT, 1040);
             param.setMargins(0, 40, 0, 0)

//             Lin.addView(newLabel(jsonInner, "id","id", "#FF0A0A0B",10F))
             Lin.addView(newLabel(jsonInner, "QR Код: ","qrcode", "#FF0A0A0B",20F))
             Lin.addView(newLabel(jsonInner, "Номер: ","ProductId", "#FF0A0A0B",10F))
             Lin.addView(newStroke());
             Lin.addView(newLabel(jsonInner, "Наименование: ","Name", "#FF0A0A0B",20F))


             Lin.addView(newLabel(jsonInner, "Путь картинки: ","ProductPicUrl", "#FF0A0A0B",10F))
             Lin.addView(newImage(jsonInner,"ProductPicUrl"))
             Lin.addView(newLabel(jsonInner, "Описание: ","Description", "#FF0A0A0B",10F))
             Lin.addView(newLabel(jsonInner, "Категория: ","Category", "#FF0A0A0B",10F))
             Lin.addView(newStroke());
             Lin.addView(newLabel(jsonInner, "Цена: ","Price", "#FF0A0A0B",10F))
             Lin.addView(newLabel(jsonInner, "Валюта: ","CurrencyCode", "#FF0A0A0B",10F))
             Lin.addView(newStroke());
             Lin.addView(newLabel(jsonInner, "Статус: ","Status", "#FF0A0A0B",10F))
             Lin.addView(newLabel(jsonInner, "Количество: ","Quantity", "#FF0A0A0B",10F))
             Lin.addView(newStroke());

             Lin.addView(newLabel(jsonInner, "Длинна: ","Width", "#FF0A0A0B",10F))
             Lin.addView(newLabel(jsonInner, "Ширина: ","Depth", "#FF0A0A0B",10F))
             Lin.addView(newLabel(jsonInner, "Высота: ","Height", "#FF0A0A0B",10F))
             Lin.addView(newLabel(jsonInner, "Ед.Изм: ","DimUnit", "#FF0A0A0B",10F))
             Lin.addView(newLabel(jsonInner, "Мера веса: ","WeightMeasure", "#FF0A0A0B",10F))
             Lin.addView(newLabel(jsonInner, "Весовая единица: ","WeightUnit", "#FF0A0A0B",10F))
             Lin.addView(newStroke());
             Lin.addView(newLabel(jsonInner, "Главная категория: ","MainCategory", "#FF0A0A0B",10F))
             Lin.addView(newLabel(jsonInner, "НалогиТип: ","TaxTarifCode", "#FF0A0A0B",10F))
             Lin.addView(newLabel(jsonInner, "Поставщик: ","SupplierName", "#FF0A0A0B",10F))

             Lin.addView(newStroke());
             Lin.addView(newLabel(jsonInner, "Дата Старта Продажи: ","DateOfSale", "#FF0A0A0B",10F))
             Lin.addView(newLabel(jsonInner, "UoM: ","UoM", "#FF0A0A0B",10F))


             Lin.layoutParams = param
             sc_card.addView(Lin)
         }
     }

 }


    fun newLabel(jsonInner: JSONObject, name:String,label:String, tcolor:String,tsize:Float): TextView{
        var DataR = jsonInner.get(label)
        val textData: TextView = TextView(this.context)
        textData.text = name + DataR.toString()
        var colortext = tcolor
        textData.setTextColor(Color.parseColor(colortext))
        textData.setTextSize(TypedValue.COMPLEX_UNIT_DIP, tsize);
        return  textData
    }

    fun newImage(jsonInner: JSONObject, label:String): ImageView{
        var DataR = jsonInner.get(label)
        val imageData: ImageView = ImageView(this.context)

        val imgUri: Uri = Uri.parse(  DataStorage().url_main() +"upload_img/"+ DataR )
        imageData.setImageURI(imgUri);
        return  imageData
    }


    fun newStroke(): TextView{
        val textData: TextView = TextView(this.context)
        textData.text = "  "
        return  textData
    }
    
    fun msgscreen(){


        val toast = Toast.makeText(
            this.context,
            R.string.msg_update,
            Toast.LENGTH_SHORT
        )
        toast.show()
    }


    fun getQuery() {

        val queue = Volley.newRequestQueue(this.context)
        val url: String =  DataStorage().url_json();
        var resp:String ="";
        val stringReq = StringRequest(
            Request.Method.GET, url,
            Response.Listener<String> { response ->
                resp = response.toString();
                var strResp = response.toString()
                val jsonObj: JSONObject = JSONObject(strResp)
                liveData.postValue(jsonObj)
            },
            Response.ErrorListener {
                resp = ""
            })
        queue.add(stringReq)
    }


}
